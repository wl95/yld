import React,{ Component } from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from './mapDispatch'
import mapStateToProps from './mapState'
import { request, filterAPI } from 'utils'
import MonthDate from 'components/Calendar'
import queryString from 'query-string'
import moment from 'moment';
import Search from '../Search'
import './index.less'

class Filter extends Component {
    constructor(){
        super()
        this.state = {
            title:'',
            tableResult:'',
            filed:{
              
            },
            branch_data:{},
            city_data:{},
            searchList:[],
            dateFormat:'YYYY-MM-DD',
        }
    }

    componentDidMount(){
        this.fetch()
    }

    /* 首次打开页面 */
    fetch = () => {
        let { filter, getAuthority, setFilter } = this.props
        let { search, href } = location
        let locationSearch = queryString.parse(search)
        let { filed } = this.state
        let herfStr = href;
        let juris = {}
        let index = herfStr.indexOf('?');
        herfStr = herfStr.slice(index+1);
        if(herfStr.indexOf('organCode') !== -1 && herfStr.indexOf('organLevel') !== -1){
            // 参数正确得传入
            herfStr.split('&').map(item=>{//把获取参数存入本地存储
                return item.split('=')
            }).forEach(item=>{
                localStorage.setItem(item[0],item[1]);
                juris[item[0]] = item[1]
            })
            getAuthority(juris)
            filed.ORGAN_LEVEL = juris.organLevel == 0 ? '1' : juris.organLevel
            this.setState({
                filed
            })
        }else{
            //参数未正确传入
        }
        filter && filter.map((item, index) => {
            filed[item.selectType] =  item.defaultValue
            // console.log(item)
            if(locationSearch.UPDATE_DATE_END){
                filed['UPDATE_DATE_END'] = moment(locationSearch.UPDATE_DATE_END, 'YYYY-MM-DD');
            }
            if(locationSearch.UPDATE_DATE_START){
                filed['UPDATE_DATE_START'] = moment(locationSearch.UPDATE_DATE_START, 'YYYY-MM-DD');
            }
            this.setState({
                filed
            })
            //请求
            filterAPI[item.requestType] && item.method && request({
                method:item.method,
                url:filterAPI[item.requestType]
            }).then(resData => {
                setFilter(resData[item.selectKey], index)
            })
        })
    }

    onModeChange = (mode) => {
        let dateFormat = {
            0:'YYYY-MM-DD',
            1:'YYYY-MM',
        }
        this.setState({
            dateFormat:dateFormat[mode]
        });
    }

    onChangeSelect = ( e, item, isData ) => {
        let { selectType } = item
        let { filed } = this.state
        let { filter, setSearch } = this.props

        if( selectType === 'DATE_TYPE' ){
            this.onModeChange(e.target.value)
        }

        if( selectType === 'dCustomerType' ){
            filter.map((item, index) => {
                if( item.selectType === 'reProper' ){
                    filter[index].disabled = e.target.value == 1 ? true : false;
                }
            })
            setSearch(filter)
            filed.reProper = ''
            this.setState({
                filed
            })
        }
        this.setState({
            filed:{
                ...filed,
                [selectType]:isData ? e : e.target.value
            },
        }, () => {
            // console.log(this.state.filed)
        })
    }

    onSubmit = () => {
        this.fetch();
        let { onFilterSubmit } = this.props
        let { filed, dateFormat } = this.state
        onFilterSubmit({ filed , dateFormat })
    }

    onClickSearchs = (value, selectType) =>{
        let { filed } = this.state
        this.setState({
            filed:{
                ...filed,
                [selectType]:value
            }
        })
    }

    onReset = () => {
        let { onFilterSubmit } = this.props
        this.setState({
            filed:{}
        })
        onFilterSubmit()
    } 

    /* 判断开始日期和结束日期 */
    disabledDate = (UPDATE_DATE, Item) => {
        const { dateCalendarType, relationship } = Item
        const { filed } = this.state
        //const { UPDATE_DATE_START, UPDATE_DATE_END } = this.state.filed;
        if (!UPDATE_DATE) {
            return false;
        }
        
        if (!filed[relationship]) {
            return false;
        }
        return dateCalendarType == 'start' ? filed[relationship].isBefore(UPDATE_DATE) : UPDATE_DATE.isBefore(filed[relationship])
    }

    onBack = () => {
        history.go(-1)
    }

    render(){
        let { filed, dateFormat } = this.state
        let { filter } = this.props
        return (
            <div className="form">
                <div className="back"><a onClick={this.onBack}>返回</a></div>
                {
                    filter && filter.map(item => {
                        return  (   
                                    <div key={item.text} className="cols">
                                        <label>{item.text}</label>
                                        { item.type === 1 && <Search value={filed[item.selectType] || ''} onClickSearchLists={this.onClickSearchs} onChange={e => this.onChangeSelect(e, item, false)} selectType={item.selectType} itemName={item.itemName} option={item.option}/>}
                                        { item.type === 2 && 
                                            <select className={"select " + (item.disabled ? 'disabled' : '')} disabled={item.disabled} value={filed[item.selectType] || item.defaultValue || ''} onChange={e => this.onChangeSelect(e, item, false)}>
                                                <option value="">请选择</option>
                                                {
                                                    item.option && item.option.map((optionItem, index) => {
                                                        return <option key={optionItem[(item.itemKey)]  + ',' + index} value={optionItem[(item.itemKey)]}>{optionItem[item.itemName]}</option>
                                                    })
                                                }
                                            </select>}
                                        { item.type === 3 && 
                                            <MonthDate
                                                dateFormat={item.dateFormat || dateFormat}
                                                dateValue={filed[item.selectType]}
                                                disabledDate={(value) => this.disabledDate(value, item)}
                                                defaultValue={item.defaultValue}
                                                onChange={e => this.onChangeSelect(e, item, true)}
                                            />}
                                    </div>
                                )
                    })
                }
                <div className="go">
                    <button onClick={this.onSubmit}>查询</button>
                    <button onClick={this.onReset}>重置</button>
                </div>
            </div>
        )
    }
}

export default Filter