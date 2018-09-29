import 'rc-calendar/assets/index.css';
import React,{Component} from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from './mapDispatch'
import mapStateToProps from './mapState'
import { request, filterAPI } from 'utils'
import MonthDate from 'components/Calendar/Month.jsx'
import './index.less'
import queryString from 'query-string'
import moment from 'moment';
import Search from '../Search'
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

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
            rcCalendar:{
                mode: 'month',
                rangeStartMode: 'date',
                rangeEndMode: 'date',
            },
            dateFormat:'YYYY-MM-DD',
        }
    }

    componentDidMount(){
        this.fetch()
    }
    /* 首次打开页面 */
    fetch = () => {
        let { filter, getAuthority, location, setFilter } = this.props
        let { search, href } = location
        let locationSearch = queryString.parse(search)
        let { filed } = this.state
        let herfStr = href;
        let juris = {}
        let index = herfStr.indexOf('?');
        herfStr = herfStr.slice(index+1);
        if(herfStr.indexOf('organCode')!==-1 && herfStr.indexOf('organLevel') !== -1){
          // 参数正确得传入
          herfStr.split('&').map(item=>{//把获取参数存入本地存储
            return item.split('=')
          }).forEach(item=>{
            localStorage.setItem(item[0],item[1]);
            juris[item[0]] = item[1]
          })
          getAuthority(juris)
        }else{
            //参数未正确传入
        }

        filter && filter.map((item, index) => {
            if(item.defaultValue === 0 || item.defaultValue != undefined){
                filed[item.selectType] = item.defaultValue
                if(locationSearch.UPDATE_DATE_END){
                    filed['UPDATE_DATE_END'] = moment(locationSearch.UPDATE_DATE_END, 'YYYY-MM-DD');
                }
                if(locationSearch.UPDATE_DATE_START){
                    filed['UPDATE_DATE_START'] = moment(locationSearch.UPDATE_DATE_START, 'YYYY-MM-DD');
                }
                this.setState({
                    filed
                })
            }
            //请求
            filterAPI[item.requestType] && item.method && request({
                method:item.method,
                url:filterAPI[item.requestType]
            }).then(resData => {
                setFilter(resData[item.selectKey], index)
            })
        })
    }

    onModeChange = ( key, e ) => {
        let mode;
        let { rcCalendar } = this.state
        if ( e && e.target ) {
            mode = e.target.value;
        } else {
            // console.log(e);
            mode = e;
        }
        //console.log(mode)
        let dateFormat = {
            0:'YYYY-MM-DD',
            1:'YYYY-MM',
        }
        // console.log(dateFormat[mode])
        this.setState({
            rcCalendar:{
                ...rcCalendar,
                [key]: mode,
            },
            dateFormat:dateFormat[mode]
        });
    }

    onChangeSelect = ( e, item, isData ) => {
        let { selectType } = item
        let { filed } = this.state
        let { filter, setSearch } = this.props

        if( selectType === 'dateType' ){
            this.onModeChange('rangeStartMode', e.target.value)
        }

        if( selectType === 'dCustomerType' ){
            let value = e.target.value
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

        if( selectType === 'PROD_ID' ){
            this.handleProdCodeChange(e, selectType);
        }
        this.setState({
            filed:{
                ...filed,
                [selectType]:isData ? e : e.target.value
            },
        })
    }

    onSubmit = () => {
        let { onFilterSubmit } = this.props
        let { filed, dateFormat } = this.state
        onFilterSubmit({ filed , dateFormat })
    }

    /* 模糊搜索*/
    handleProdCodeChange(e, selectType){
        let SearchResult=document.querySelector('.SearchResults')
        const { filter }=this.props;
        const { filed } = this.state
        let prodCodeList = filter.find(item => item.selectType === selectType).option
        let str = '';
        if ( !e.target.value ) {
            e.target.value = ''
        }
        let val = e.target.value;
        if ( val !== '' && val.length > 0 ) {
            SearchResult.style.display = 'block';
            for ( let i in prodCodeList ) {
                let txt = prodCodeList[i].prodCode;
                if ( txt.indexOf(val) == 0 ) {
                    txt = txt.slice(val.length)
                    str += "<li><a>" + val + "</a><b>" + txt + "</b></li>"
                }
            }
        } else {
            SearchResult.style.display = 'none';
        }
        let that = this;
        SearchResult.innerHTML = str
        const List = SearchResult.querySelectorAll('li');
        for ( let i = 0, len = List.length; i < len; i++ ) {
            List[i].onclick = function () {
                SearchResult.innerHTML = '';
                SearchResult.style.display = 'none';
                that.setState({
                    filed:{
                        ...filed,
                        [selectType]:this.innerText
                    }
                })
            }
        }
    }

    onReset = () => {
        let { onFilterSubmit } = this.props
        this.setState({
            filed:{}
        })
        onFilterSubmit()
    } 
    /* 判断开始日期和结束日期 */
    disabledDate = (UPDATE_DATE, dateCalendarType) => {
        const { UPDATE_DATE_START, UPDATE_DATE_END } = this.state.filed;
        if(dateCalendarType === 'start'){
            if (!UPDATE_DATE) {
                return false;
            }
            if (!UPDATE_DATE_END) {
                return false;
            }
            return UPDATE_DATE_END.isBefore(UPDATE_DATE)
        } else if(dateCalendarType === 'end') {
            if (!UPDATE_DATE) {
              return false;
            }
           
            if (!UPDATE_DATE_START) {
              return false;
            }
            return UPDATE_DATE.isBefore(UPDATE_DATE_START)
        }
        
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
                                        { item.type === 1 && <Search value={filed[item.selectType] || ''} onChange={e => this.onChangeSelect(e, item, false)} selectType={item.selectType}/>}
                                        { item.type === 2 && 
                                            <select className={"select " + (item.disabled ? 'disabled' : '')} disabled={item.disabled} value={filed[item.selectType] || ''} onChange={e => this.onChangeSelect(e, item, false)}>
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
                                                disabledDate={(value) => this.disabledDate(value, item.dateCalendarType)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter)