import 'rc-calendar/assets/index.css';
import React,{Component} from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from './mapDispatch'
import mapStateToProps from './mapState'
import { request, filterAPI } from 'utils'
import MonthDate from 'components/Calendar/Month.jsx'
import './index.less'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Search from '../Search'
import { apiPrefix } from 'utils/APIpath/common'
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
        let { filter, setFilter, getAuthority } = this.props
        let herfStr = location.href;
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
                let { filed } = this.state
                filed[item.selectType] = item.defaultValue
                this.setState({
                    filed
                })
            }
            //请求
            /* filterAPI[item.requestType] && item.method && request({
                method:item.method,
                url:filterAPI[item.requestType]
            }).then(resData => {
                setFilter(resData[item.selectKey], index)
            }) */
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

    /***
     * 起始日期和开始日期判断
     * @param value
     */
    disabledEndDate = (e, selectType, isData) => {
        let { filed } = this.state;
        
        if(isData && filed.UPDATE_DATE_START && selectType === 'UPDATE_DATE_END' && Number(filed.UPDATE_DATE_START.valueOf()>e.valueOf())){
            toast.warn("结束时间不能小于起始时间!", {
                position:toast.POSITION.TOP_CENTER
            });
            return 0;
        }
        if(isData && filed.UPDATE_DATE_END && selectType === 'UPDATE_DATE_START' && Number(e.valueOf()>filed.UPDATE_DATE_END.valueOf())){
            toast.warn("起始时间不能大于结束时间!", {
                position:toast.POSITION.TOP_CENTER
            });
            return 0;
        }
        return 1;
    }

    onChangeSelect = ( e, item, isData ) => {
        let { selectType, linkage, isMonth } = item
        let { filed, dateFormat } = this.state
        let { setFilter, filter, setSearch } = this.props

        if(!this.disabledEndDate(e, selectType, isData)){
          return;
        }

        if( selectType === 'PROVINCE_CODE' ){
            let value = e.target.value
            request({
                method:'get',
                url:`${apiPrefix}/organization/province_${e.target.value}.json`
            }).then(resData => {
                let { area_data, branch_data, city_data } = resData
                filter.map((item, index) => {
                    if( item.itemKey === linkage ){
                        setFilter(area_data[value].areaList, index)
                    }
                })
                this.setState({
                    branch_data,
                    city_data,
                })
            })
        }

        if( selectType === 'PREFECTURE_CODE' &&  filed['PROVINCE_CODE'] ){
            let value = e.target.value
            let { city_data } = this.state;
            filter.map((cityItem, index) => {
                if( cityItem.itemKey === linkage ){
                    setFilter(city_data[value].cityList, index)
                }
            })    
        }

        if( selectType === 'CITY_CODE' &&  filed['PREFECTURE_CODE'] ){
            let value = e.target.value
            let { branch_data } = this.state;
            filter.map((branchItem, index) => {
                if( branchItem.itemKey === linkage ){
                    setFilter(branch_data[value], index)
                }
            })    
        }

        if( selectType === 'dateType' ){
            this.onModeChange('rangeStartMode', e.target.value)
        }

        if( selectType === 'dCustomerType' ){
            let value = e.target.value
            // console.log(filter)
            filter.map((item, index) => {
                // console.log(item)
                if( item.selectType === 'reProper' ){
                    //console.log(e.target.value)
                    //console.log(filter[index])
                    filter[index].disabled = e.target.value == 1 ? true : false;
                    console.log(value == 1)
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
        let { onFilterSubmit, location } = this.props
        let { filed, dateFormat } = this.state
        // console.log(filed)
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
        this.setState({
            filed:{}
        })
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
                                            <select className="select" disabled={item.disabled} value={filed[item.selectType] || ''} onChange={e => this.onChangeSelect(e, item, false)}>
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
                                               /*  selectsStart={item.selectType === 'UPDATE_DATE_START'} 
                                                selectsEnd={item.selectType === 'UPDATE_DATE_END'} 
                                                selected={moment(filed[item.selectType])}
                                                endDate={moment(filed[item.selectType])}
                                                startDate={moment(filed[item.selectType])}
                                                onChange={e => this.onChangeSelect(e, item, true)} */
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