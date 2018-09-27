import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { fetchDataCallback } from "../../actions/commonActions";
import { setAreaList, setCityList, setBranchList } from "../../actions/reportActions";
import {FETCH_URL_AREA, FETCH_URL_CITY, FETCH_URL_BRANCH,FETCH_URL_FM_HOLDING, INIT_ORGANLEVEL, INIT_ORGANCODE} from "../../utils/constant";
import { Form, Col, FormControl, Button, FormGroup, Glyphicon, Row, ControlLabel } from 'react-bootstrap';
import Search from '../../components/Search';
/* import Calendar from 'rc-calendar';
import style from 'rc-calendar/assets/index.css' */
import './report.less'
// import ReportTables from '../reportTable/ReportTables'
import DoubleheadTable from '../reportTable/DoubleheadTable';
import { toast } from 'react-toastify';

// import WithTotal from '../reportTable/WithTotal'

//初始化state
const initState = {
    organCode: INIT_ORGANCODE,
    organLevel:INIT_ORGANLEVEL,
    prodCodeValue: "",//产品代码
    dateTypeValue: "0",//日期格式
    provinceValue: "",//省份
    areaList: [],
    areaIsNull:false,
    areaValue: "",//地市
    cityList: [],
    cityIsNull:false,
    cityValue: "",//市县
    branchList: [],
    branchIsNull:false,
    branchValue: "",//网点
    prodStatusValue: "",//产品状态
    customerTypeValue: "",//投资者类型
    organTypeValue: "",//机构属性
    currencyValue: "",//发行币种
    dataGranularityFilter:["1","2","3","4"],
    dataGranularityValue:"1",//数据粒度
    brandValue: [],//产品品牌
    prodOperModelValue: [],//产品运作模式
    profitTypeValue: [],//产品收益类型
    InstCustTypeValue: [],//机构客户
    startValue: moment(),//起始日期
    endValue: moment(),//终止日期
    dateFormat: "YYYY-MM-DD",
    provinceDisabled:false,
    areaDisabled:false,
    cityDisabled:false,
    branchDisabled:false,
    data: [],
    pagination: {current:1,pageSize:10},
    loading: false,
    startDate: moment(),//得到开始日期赋值给startValue
    endDate: moment(),// 得到结束日期赋值给endValue
    isClearable:false
}

/**
 * 报表容器
 */

class Report extends Component {
    constructor(props) {
        super(props)
        //初始化表单数据
        // console.log("Report=====constructor===")
        this.state = {
            ...initState
        }
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.updateUserInfo()
    }

    /***
     * 切换省份时的回调函数，联动市，县，网点
     * @param value
     */
    handleProvinceChange = (e) => {
        const {areaList} = this.props
        // console.log(areaList)
        let localAreaList = areaList[e.target.value]
        if (!localAreaList || localAreaList.length <= 0) {
            let params = {provinceCode: e.target.value}
            //请求
            this.props.fetchDataCallback(FETCH_URL_AREA,
                'GET',
                params,
                (json) => {
                    this.props.setAreaList(json)
                    const {areaList} = this.props
                    this.setState({
                        ...this.state,
                        provinceValue:params.provinceCode,
                        areaList: areaList[params.provinceCode],
                        areaValue:localAreaList,
                        // areaValue: "",
                        cityList: [],
                        cityValue: "",
                        branchList: [],
                        branchValue: ""
                    })
                },
                null,
                false,
                true)
        } else {
            this.setState({
                ...this.state,
                provinceValue: e.target.value,
                areaList: localAreaList,
                // areaValue:localAreaList[0].areaCode
                areaValue: "",
                cityList: [],
                cityValue: "",
                branchList: [],
                branchValue: ""
            })
        }
    }

    /***
     * 切换地市时的回调函数，联动县，网点
     * @param value
     */
    handleAreaChange = (e) => {
        const {cityList} = this.props
        let localCityList = cityList[e.target.value]
        if (!localCityList || localCityList.length <= 0) {
            let params = {areaCode: e.target.value}
            //请求
            this.props.fetchDataCallback(FETCH_URL_CITY,
                'GET',
                params,
                (json) => {
                    this.props.setCityList(json)
                    const {cityList} = this.props
                    // localCityList = cityList[value]
                    let cityCode = ""
                    if (!localCityList || localCityList.length <= 0) {
                        cityCode = ""
                    } else { 
                        cityCode = localCityList[0].cityCode
                    }
                    this.setState({
                        ...this.state,
                        // areaValue: params.areaCode,
                        areaValue:params.areaCode,
                        cityList:cityList[params.areaCode],
                        //cityValue:cityCode,
                        cityValue: "",
                        branchList: [],
                        branchValue: ""
                    })
                },
                null,
                false,
                true)
        } else {
            this.setState({
                ...this.state,
                areaValue: e.target.value,
                cityList: localCityList,
                // cityValue:localCityList[0].cityCode
                cityValue: "",
                branchList: [],
                branchValue: ""
            })
        }
    }

    /***
     * 切换市县时的回调函数，联动网点
     * @param value
     */
    handleCityChange = (e) => {
        const {branchList} = this.props;
        // console.log(this.props)
        // console.log(branchList)
        let localBranchList = branchList[e.target.value]
        if (!localBranchList || localBranchList.length <= 0) {
            let params = {cityCode: e.target.value}
            //请求
            this.props.fetchDataCallback(FETCH_URL_BRANCH,
                'GET',
                params,
                (json) => {
                    this.props.setBranchList(json)
                    const {branchList} = this.props
                    let branchCode = ""
                    if (!localBranchList || localBranchList.length <= 0) {
                        branchCode = ""
                    } else {
                        branchCode = localBranchList[0].branchCode
                    }
                    this.setState({
                        ...this.state,
                        cityValue: params.cityCode,
                        branchList: branchList[params.cityCode],
                        // branchValue:branchCode
                        branchValue: ""
                    })
                },
                null,
                false,
                true)
        } else {
            this.setState({
                ...this.state,
                cityValue: e.target.value,
                branchList: localBranchList,
                // branchValue:localBranchList[0].branchCode
                branchValue: ""
            })
        }
    }

    /***
     * 切换网点时的回调函数
     * @param value
     */
    handleBranchChange = (e) => {
        this.setState({
            ...this.state,
            branchValue: e.target.value
        })
    }

    /***
     * 切换产品状态时的回调函数
     * @param value
     */
    handleProdStatusChange = (e) => {
        this.setState({
            ...this.state,
            prodStatusValue: e.target.value
        })
    }

    /***
     * 切换投资者类型时的回调函数，联动机构客户
     * @param value
     */
    handleCustomerTypeChange = (e) => {
        this.setState({
            ...this.state,
            customerTypeValue: e.target.value,
            InstCustTypeValue:[]
        })
    }

    /***
     * 切换机构属性时的回调函数
     * @param value
     */
    handleOrganTypeChange = (e) => {
        this.setState({
            ...this.state,
            organTypeValue: e.target.value
        })
    }

    /***
     * 切换币种时的回调函数
     * @param value
     */
    handleCurrencyChange = (e) => {
        this.setState({
            ...this.state,
            currencyValue: e.target.value
        })
    }

    /***
     * 切换日期格式时的回调函数，联动起始日期，终止日期
     * @param value
     */
    handleDateTypeChange = (e) => {
        let format=e.target.value==="0" ? "YYYY-MM-DD" : "YYYY-MM"
        this.setState({
            ...this.state,
            dateTypeValue: e.target.value,
            dateFormat:format,
            startDate:moment(),
            endDate:moment()
        })
    }

    /***
     * 切换数据粒度时的回调函数
     * @param value
     */
    handleDataGranularityChange = (e) => {
        this.setState({
            ...this.state,
            dataGranularityValue: e.target.value
        })
    }

    /***
     * 切换产品品牌时的回调函数
     * @param value
     */
    handleBrandChange = (e) => {
        this.setState({
            ...this.state,
            brandValue: e.target.value
        })
    }

    /***
     * 切换产品运作模式时的回调函数
     * @param value
     */
    handleProdOperModelChange = (e) => {
        this.setState({
            ...this.state,
            prodOperModelValue: e.target.value
        })
    }

    /***
     * 切换产品收益类型时的回调函数
     * @param value
     */
    handleProfitTypeChange = (e) => {
        this.setState({
            ...this.state,
            profitTypeValue: e.target.value
        })
    }

    /***
     * 切换产品代码时的回调函数
     * @param value
     */
    // handleProdCodeChange = (e) => {
    //     if(!e.target.value){
    //         e.target.value=""
    //     }
    //     this.setState({
    //         ...this.state,
    //         prodCodeValue: e.target.value
    //     })
    // }
    handleProdCodeChange(e){
        let InputBOX = document.querySelector('.InputBOX')
        let SearchResult=document.querySelector('.SearchResult')
        const {prodCodeList}=this.props;
        let str = '';
        if (!e.target.value) {
            e.target.value = ''
        }
        let val = e.target.value;
        if (val.value !== '' && val.length > 0) {
            SearchResult.style.display = 'block';
            for (let i in prodCodeList) {
                let txt = prodCodeList[i].prodCode;
                if (txt.indexOf(val) == 0) {
                    txt = txt.slice(val.length)
                    str += "<li><a>" + val + "</a><b>" + txt + "</b></li>"
                }
            }
        } else {
            SearchResult.style.display = 'none';

        }
        SearchResult.innerHTML = str
        const List = SearchResult.querySelectorAll('li');
        let that = this;
        for (let i = 0, len = List.length; i < len; i++) {
            List[i].onclick = function () {
                InputBOX.value = this.innerText;
                SearchResult.innerHTML = '';
                SearchResult.style.display = 'none';
                that.setState({
                    prodCodeValue:this.innerText
                })
            }
        }
    }

    /***
     * 切换机构客户时的回调函数
     * @param value
     */
    handleInstCustTypeChange = (e) => {
        this.setState({
            ...this.state,
            InstCustTypeValue: e.target.value
        })
    }

    /***
     * 切换起始日期时的回调函数
     * @param value
     */
    // onStartChange = (value) => {
    //     if(!value){
    //         //value=moment()
    //     }
    //     this.onDateChange('startValue', value);
    // }

    /***
     * 切换终止日期时的回调函数
     * @param value
     */
    // onEndChange = (value) => {
    //     if(!value){
    //         //value=moment()
    //     }
    //     this.onDateChange('endValue', value);
    // }   

    /***
     * 获取地市列表
     * @param value
     */
    getAreaList = (value) => {
        const {areaList} = this.props
        let localAreaList = areaList[value]
        if (!localAreaList || localAreaList.length <= 0) {
            let params = {provinceCode: value}
            //请求
            this.props.fetchDataCallback(FETCH_URL_AREA,
                'GET',
                params,
                (json) => {
                    this.props.setAreaList(json)
                    const {areaList} = this.props
                    localAreaList = areaList[value]
                    let isNull=false
                    if (!localAreaList || localAreaList.length <= 0) {
                        isNull=true
                    } else {
                        isNull=false
                    }
                    this.setState({
                        ...this.state,
                        areaList: localAreaList,
                        areaIsNull:isNull
                    })
                },
                null,
                false,
                true)
        } else {
            this.setState({
                ...this.state,
                areaList: localAreaList
            })
        }
    }

    /***
     * 获取市县列表
     * @param value
     */
    getCityList = (value) => {
        const {cityList} = this.props
        let localCityList = cityList[value]
        if (!localCityList || localCityList.length <= 0) {
            let params = {areaCode: value}
            //请求
            this.props.fetchDataCallback(FETCH_URL_CITY,
                'GET',
                params,
                (json) => {
                    this.props.setCityList(json)
                    const {cityList} = this.props
                    localCityList = cityList[value]
                    let isNull=false
                    if (!localCityList || localCityList.length <= 0) {
                        isNull=true
                    } else {
                        isNull=false
                    }
                    this.setState({
                        ...this.state,
                        cityList: localCityList,
                        cityIsNull:isNull
                    })
                },
                null,
                false,
                true)
        } else {
            this.setState({
                ...this.state,
                cityList: localCityList
            })
        }
    }

    /***
     * 获取网点列表
     * @param value
     */
    getBranchList = (value) => {
        const {branchList} = this.props
        let localBranchList = branchList[value]
        if (!localBranchList || localBranchList.length <= 0) {
            let params = {cityCode: value}
            //请求
            this.props.fetchDataCallback(FETCH_URL_BRANCH,
                'GET',
                params,
                (json) => {
                    this.props.setBranchList(json)
                    const {branchList} = this.props
                    localBranchList = branchList[value]
                    let isNull=false
                    if (!localBranchList || localBranchList.length <= 0) {
                        isNull=true
                    } else {
                        isNull=false
                    }
                    this.setState({
                        ...this.state,
                        branchList: localBranchList,
                        branchIsNull:isNull
                    })
                },
                null,
                false,
                true)
        } else {
            this.setState({
                ...this.state,
                branchList: localBranchList
            })
        }
    }

    /***
     * 阻止默认的表单提交事件
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault()
    }

    /***
     * 切换列表分页时的回调函数
     * @param value
     */
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination }
        pager.current = pagination.current
        this.setState({
            pagination: pager,
        },()=>{
            const dataLength = this.state.data.length
            let currentTotalPage=0
            if(dataLength % pagination.pageSize >0){
                currentTotalPage = (dataLength/pagination.pageSize)+1
            }else{
                currentTotalPage = dataLength/pagination.pageSize
            }
            if(currentTotalPage<pagination.current){
                this.getData()
            }
        });

    }

    /***
     * 点击查询按钮
     * @param value
     */
    search = () => {
        // console.log(this.state)
        this.setState({pagination: {current:1,pageSize:10},data:[]},()=>{this.getData()})
    }

    /***
     * 查询报表
     * @param value
     */
    getData = () => {
        this.setState({ loading: true })
        console.log("params=====provinceValue=" + this.state.provinceValue +
            "organCode=" + this.state.organCode+
            "areaValue=" + this.state.areaValue +
            "cityValue=" + this.state.cityValue +
            "branchValue=" + this.state.branchValue+
            "prodStatusValue=" + this.state.prodStatusValue+
            "customerTypeValue=" + this.state.customerTypeValue+
            "organTypeValue=" + this.state.organTypeValue+
            "currencyValue=" + this.state.currencyValue+
            "dateTypeValue=" + this.state.dateTypeValue+
            "dataGranularityValue=" + this.state.dataGranularityValue+
            "brandValue=" + this.state.brandValue+
            "prodOperModelValue=" + this.state.prodOperModelValue+
            "profitTypeValue=" + this.state.profitTypeValue+
            "prodCodeValue=" + this.state.prodCodeValue+
            "InstCustTypeValue=" + this.state.InstCustTypeValue+
            "startValue=" + this.state.startValue.format(this.state.dateTypeValue==="日" ? "YYYYMMDD" : "YYYYMM")+
            "endValue=" + this.state.endValue.format(this.state.dateTypeValue==="日" ? "YYYYMMDD" : "YYYYMM")
        )

        const {dateTypeValue, startValue,endValue, prodCodeValue,
            provinceValue, areaValue, cityValue, branchValue,
            prodStatusValue,brandValue,prodOperModelValue,profitTypeValue,
            customerTypeValue,InstCustTypeValue,organTypeValue,dataGranularityValue,
            currencyValue,pagination} = this.state

        const beginDate=this.state.startValue.format(this.state.dateTypeValue==="日" ? "YYYYMMDD" : "YYYYMM")
        // console.log(beginDate)
        const endDate=this.state.endValue.format(this.state.dateTypeValue==="日" ? "YYYYMMDD" : "YYYYMM")
        // console.log(endDate)
        const offset=(pagination.current-1)*pagination.pageSize
        //console.log("params=====offset=" + offset)
        let params = {dateType: dateTypeValue,beginDate:startValue,endDate:endValue,prodCode:prodCodeValue,
                      province:provinceValue,area:areaValue,city:cityValue,branch:branchValue,
            prodStatus:prodStatusValue,prodBrand:brandValue,prodOperModel:prodOperModelValue,profitType:profitTypeValue,
            customerType:customerTypeValue,instCustType:InstCustTypeValue,organFlag:organTypeValue,dataGranularity:dataGranularityValue,
            currency:currencyValue,
            offset:offset,
            limits:200
        }
        //请求
        this.props.fetchDataCallback(FETCH_URL_FM_HOLDING,
            'GET',
            params,
            (json) => {
                const pagination = { ...this.state.pagination }
                pagination.total = json.totalCount

                this.setState({
                    loading:false,
                    pagination,
                    data:[...this.state.data,...json.holdingDataList],
                    sum:json.sum
                })
            },
            null,
            false,
            true)
    }

    /***
     * 点击重置按钮
     * @param value
     */
    reload = () => {

        this.setState({
            ...initState
        },()=>{
            this.updateUserInfo()
        })

    }

    /***
     * 组件将要更新的生命周期，在这里根据当前登录的用户信息设置查询条件的状态
     * @param value
     */
    componentWillUpdate(){
        // console.log("componentWillUpdate=========")
        this.updateUserInfo()
    }

    /***
     * 根据用户信息修改查询条件选择框的可选状态以及当前选中项
     */
    updateUserInfo=() => {
        const {userInfo} = this.props
        const {userOrganCode,userOrganLevel, userProvinceCode, userAreaCode, userCityCode, userBranchCode} = userInfo

        const {organCode,organLevel,provinceValue, areaList,areaIsNull, areaValue, cityList,cityIsNull, cityValue, branchList,branchIsNull, branchValue,
            dataGranularityValue} = this.state
        // console.log("updateUserInfo====level====="+userOrganLevel+organCode)
        //根据用户信息修改机构选择框的可选状态以及当前选中项
        if(userOrganLevel==="1"){
            // const {areaList} = this.props
            // let localAreaList = areaList[userProvinceCode]
            // if (!localAreaList || localAreaList.length <= 0) {
            console.log("updateUserInfo====areaIsNull====="+areaIsNull)
            if(areaList.length<=0 && !areaIsNull){
                // console.log("updateUserInfo====areaList=====")
                this.getAreaList(userProvinceCode)
            }
            if(userOrganCode!==organCode || userOrganLevel!==organLevel || userProvinceCode!==provinceValue){
                // console.log("updateUserInfo====setState=====")
                this.setState({
                    ...this.state,organCode:userOrganCode,
                    organLevel:userOrganLevel,
                    provinceValue:userProvinceCode,
                    provinceDisabled:true,
                    dataGranularityFilter:["1","2","3","4"],
                    dataGranularityValue:"1"
                })
            }

        }

        if(userOrganLevel==="2"){
            if(areaList.length<=0 && !areaIsNull){
                this.getAreaList(userProvinceCode)
            }
            if(cityList.length<=0 && !cityIsNull){
                this.getCityList(userAreaCode)
            }
            if(userOrganCode!==organCode || userOrganLevel!==organLevel || userProvinceCode!==provinceValue || userAreaCode!==areaValue) {
                this.setState({
                    ...this.state, organCode: userOrganCode,
                    organLevel: userOrganLevel,
                    provinceValue: userProvinceCode,
                    areaValue: userAreaCode,
                    provinceDisabled: true,
                    areaDisabled: true,
                    dataGranularityFilter:["2","3","4"],
                    dataGranularityValue:"2"
                })
            }
        }

        if(userOrganLevel==="3"){
            if(areaList.length<=0 && !areaIsNull){
                this.getAreaList(userProvinceCode)
            }
            if(cityList.length<=0 && !cityIsNull){
                this.getCityList(userAreaCode)
            }
            if(branchList.length<=0 && !branchIsNull){
                this.getBranchList(userCityCode)
            }
            if(userOrganCode!==organCode || userOrganLevel!==organLevel || userProvinceCode!==provinceValue || userAreaCode!==areaValue || userCityCode!==cityValue) {
                this.setState({
                    ...this.state, organCode: userOrganCode,
                    organLevel: userOrganLevel,
                    provinceValue: userProvinceCode,
                    areaValue: userAreaCode,
                    cityValue: userCityCode,
                    provinceDisabled: true,
                    areaDisabled: true,
                    cityDisabled: true,
                    dataGranularityFilter:["3","4"],
                    dataGranularityValue:"3"
                })
            }
        }

        if(userOrganLevel==="4"){
            if(areaList.length<=0){
                this.getAreaList(userProvinceCode)
            }
            if(cityList.length<=0){
                this.getCityList(userAreaCode)
            }
            if(branchList.length<=0){
                this.getBranchList(userCityCode)
            }
            if(userOrganCode!==organCode || userOrganLevel!==organLevel || userProvinceCode!==provinceValue || userAreaCode!==areaValue || userCityCode!==cityValue || userBranchCode!==branchValue) {
                this.setState({
                    ...this.state, organCode: userOrganCode,
                    organLevel: userOrganLevel,
                    provinceValue: userProvinceCode,
                    areaValue: userAreaCode,
                    cityValue: userCityCode,
                    branchValue: userBranchCode,
                    provinceDisabled: true,
                    areaDisabled: true,
                    cityDisabled: true,
                    branchDisabled: true,
                    dataGranularityFilter:["4"],
                    dataGranularityValue:"4"
                })
            }
        }
    }

    onChangeCalendar( e ){
        let Calendar = document.getElementsByClassName('rc-calendar-date-panel')[0];
        // console.log(Calendar)
        Calendar.classList.add('disn')
    }

    onDoubleClickCalendar() {
        // console.log(1)
    }

    /***
     * 过滤不可选的起始日期
     * @param value
     */
    disabledStartDate = (startValue) => {
        //console.log(startValue)
        const endValue = this.state.endValue;
      if (!startValue || !endValue || startValue==="" || endValue==="") {
            return false;
        } 
        if(Number(startValue.valueOf()>endValue.valueOf())){
              toast.warn("起始时间不能大于结束时间!", {
                position:toast.POSITION.TOP_CENTER
            });
            //用户选择错误的日期执行默认查询当天数据
            this.setState({
                ...this.state,
                startValue:endValue
            })   
        } 
        
    }

    /***
     * 过滤不可选的终止日期
     * @param value
     */
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue || startValue==="" || endValue==="") {
            return false;
        }
        if(Number(endValue.valueOf() < startValue.valueOf())){
            toast.warn("结束时间不能小于开始结束时间!", {
                position:toast.POSITION.TOP_CENTER
            });
            //用户选择错误的日期执行默认查询当天数据
            this.setState({
                ...this.state,
                endValue:startValue
            })   
        }
        
    }

    /***
     * 切换日期时的回调函数
     * @param value
     */
    onDateChange = (field, value) => {
        this.setState({
            [field]: value
        });

    }

    disabledDate(DataSum){
    
    }

    handleChangeStart(date) {
        console.log(date.format("YYYY/MM/DD"))
        this.setState({
          startDate: date
        });
        this.onDateChange('startValue', date);
        this.disabledStartDate(date)
    }

    handleChangeEnd(date){
         this.setState({
            endDate: date
          });
           this.onDateChange('endValue', date);
           this.disabledEndDate(date)
    }

    /**
     * 日历获取焦点显示清除符号
     */
    handleOnBlur(date){
        if(date!==null){
            this.setState({
                isClearable:true
            })
        }
    }

    render() {

        // console.log("render**************Report")
        // console.log(this.props)
        const {provinceList,dateTypeList,brandList,prodCodeList,userInfo} = this.props;
        // console.log(provinceList)
        const {userOrganCode,userOrganLevel, userProvinceCode, userAreaCode, userCityCode, userBranchCode} = userInfo
        const {prodStatus,customerType,organType,currency,dataGranularity,prodOperModel,profitType,InstCustType} = this.props.dictionariesData

        let {organCode,organLevel,prodCodeValue,dateTypeValue,provinceValue,brandValue, areaList, areaValue, cityList, cityValue, branchList, branchValue,prodStatusValue,
            customerTypeValue,organTypeValue,currencyValue,dataGranularityValue,prodOperModelValue,profitTypeValue,InstCustTypeValue,
            startValue, endValue, dateFormat,provinceDisabled, areaDisabled, cityDisabled, branchDisabled,dataGranularityFilter} = this.state

        // console.log(dataGranularity)
        let tableProps = {
            title:'各理财产品日均保有量统计表',
            data:[],
            tableHead:['产品代码','产品名称','日均保有量（万份）'],
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="report-form" style={{width:'100%'}}>
                    <Row className="mt5">
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>日期格式：</ControlLabel>
                                <FormControl componentClass="select" 
                                    value={dateTypeValue === "" ? "全部" : dateTypeValue}
                                    onChange={this.handleDateTypeChange}
                                >
                                    <option value="">请输入</option>
                                    {dateTypeList && dateTypeList.map(dateType => <option
                                        key={dateType.code}>{dateType.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3} lg={3} className="flex center StateDate">
                            <ControlLabel className="fday">起始日期：</ControlLabel>
                            <DatePicker
                                placeholderText="请选择起始日期" 
                                selected={this.state.startDate}
                                selectsStart 
                                endDate={this.state.endDate}
                                startDate={this.state.startDate}
                                onChange={this.handleChangeStart}
                                isClearable={this.state.isClearable}
                                dateFormat="YYYY/MM/DD"
                                onBlur={this.handleOnBlur}
                            />
                        </Col>
                        <Col xs={6} md={3} lg={3} className="flex center StateDate">
                            <ControlLabel className="fday">终止日期：</ControlLabel>
                            <DatePicker
                                placeholderText="请选择结束日期" 
                                selected={this.state.endDate}
                                selectsEnd
                                endDate={this.state.endDate}
                                startDate={this.state.startDate}
                                isClearable={this.state.isClearable}
                                onChange={this.handleChangeEnd}
                                dateFormat="YYYY/MM/DD"
                                onBlur={this.handleOnBlur}
                            />
                        </Col>
                        <Col xs={12} md={3} lg={3}>
                            <FormGroup className="flex center">
                               <Search handleProdCodeChange={this.handleProdCodeChange.bind(this)}/>
                                {/* <ControlLabel>产品代码：</ControlLabel>
                                <FormControl componentClass="select" 
                                    // disabled={cityDisabled && cityDisabled !== ""}
                                    value={prodCodeValue ? prodCodeValue : ''}
                                    onChange={this.handleProdCodeChange}
                                >
                                      <option value="">请选择</option>
                                      {prodCodeList && prodCodeList.map(proCode => <option
                                        key={proCode.prodCode} value={proCode.prodCode}>{proCode.prodCode}</option>)}
                                </FormControl> */}

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt5">
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>省份：</ControlLabel>
                                <FormControl componentClass="select" 
                                    disabled={provinceDisabled && provinceDisabled !== ""}
                                    value={provinceValue === "" ? "全部" : provinceValue}
                                    onChange={this.handleProvinceChange}
                                >
                                    <option value="">请选择</option>
                                    
                                    {provinceList && provinceList.map((province) => <option
                                        key={province.provinceCode} value={province.provinceCode}>{province.provinceName}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>地市：</ControlLabel>
                                <FormControl componentClass="select" 
                                    disabled={areaDisabled && areaDisabled !== ""}
                                    value={areaValue === "" ? "全部" : areaValue}
                                    onChange={this.handleAreaChange}
                                >
                                    <option>请选择</option>
                                    {areaList && areaList.map(area => <option
                                        key={area.areaCode} value={area.areaCode}>{area.areaName}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>市县：</ControlLabel>
                                <FormControl componentClass="select"
                                    disabled={cityDisabled && cityDisabled !== ""} 
                                    placeholder="请选择市县"
                                    value={cityValue === "" ? "全部" : cityValue}
                                    onChange={this.handleCityChange}
                                >
                                    <option value="">请选择</option>
                                    {cityList && cityList.map(city => <option
                                        key={city.cityCode} value={city.cityCode}>{city.cityName}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                              <FormGroup className="flex center">
                                <ControlLabel>网点：</ControlLabel>
                                <FormControl componentClass="select" 
                                    disabled={branchDisabled && branchDisabled !== ""}
                                    placeholder="请选择网点"
                                    value={branchValue === "" ? "全部" : branchValue}
                                    onChange={this.handleBranchChange}
                                >
                                    <option value="">请选择</option>
                                    {branchList && branchList.map(branch => <option
                                        key={branch.branchCode} value={branch.branchCode}>{branch.branchName}</option>)}
                                </FormControl>  
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt5">
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>产品状态：</ControlLabel>
                                <FormControl componentClass="select" 
                                    placeholder="请选择产品"
                                    value={prodStatusValue === "" ? "全部" : prodStatusValue}
                                    onChange={this.handleProdStatusChange}
                                >
                                    <option value="">请选择 </option>
                                    {prodStatus && prodStatus.map(status => <option
                                        key={status.code} value={status.code}>{status.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>产品品牌：</ControlLabel>
                                <FormControl componentClass="select" 
                                    placeholder="请选择产品"
                                    value={brandValue === "" ? "全部" : brandValue}
                                    onChange={this.handleBrandChange}
                                > 
                                    <option value="">请选择</option>
                                    {brandList && brandList.map((brand,index) => <option
                                        key={index + ',' + brand.brandCode} value={index + ',' + brand.brandCode}>{brand.brandName}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>产品运作模式：</ControlLabel>
                                <FormControl componentClass="select" 
                                    placeholder="请选择产品"
                                    value={prodOperModelValue === "" ? "请选择产品" : prodOperModelValue}
                                    //value={prodOperModelValue}
                                    onChange={this.handleProdOperModelChange}
                                    // disabled={customerTypeValue!=="2"}
                                >
                                    <option value="">请选择</option>
                                    {prodOperModel && prodOperModel.map(pmode => <option
                                        key={pmode.code} value={pmode.code}>{pmode.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>产品收益类型：</ControlLabel>
                                <FormControl componentClass="select" 
                                    placeholder="请选择产品收益类型"
                                    value={profitTypeValue === "" ? "请选择" : profitTypeValue}
                                    onChange={this.handleProfitTypeChange}
                                >
                                    <option value="">请选择</option>
                                    {profitType && profitType.map(pType => <option
                                        key={pType.code} value={pType.code}>{pType.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt5">
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>投资者类型：</ControlLabel>
                                <FormControl componentClass="select" 
                                    // value={dataGranularityValue === "" ? "请选择投资者类型" : dataGranularityValue}
                                    value={customerTypeValue === "" ? "全部" : customerTypeValue}
                                    onChange={this.handleCustomerTypeChange}
                                >
                                    <option value="">全部</option>
                                    {customerType && customerType.map(type => <option
                                        key={type.code} value={type.code}>{type.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>机构客户：</ControlLabel>
                                <FormControl componentClass="select" 
                                    placeholder="请选择"
                                    value={InstCustTypeValue === "" ? "全部" : InstCustTypeValue}
                                    onChange={this.handleInstCustTypeChange}
                                    // disabled={customerTypeValue!=="2"}
                                >
                                    <option value="">请选择</option>
                                    {InstCustType && InstCustType.map(icType => <option
                                        key={icType.code} value={icType.code}>{icType.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>机构属性：</ControlLabel>
                                <FormControl componentClass="select" 
                                    // value={dataGranularityValue === "" ? "请选择机构属性" : dataGranularityValue}
                                    value={organTypeValue === "" ? "全部" : organTypeValue}
                                    onChange={this.handleOrganTypeChange}
                                >
                                    <option value="">全部</option>
                                    {organType && organType.map(type => <option
                                        key={type.code} value={type.code}>{type.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>数据粒度：</ControlLabel>
                                <FormControl componentClass="select" 
                                    value={dataGranularityValue === "" ? "请选择" : dataGranularityValue}
                                    onChange={this.handleDataGranularityChange}
                                >
                                    <option value="">请选择</option>
                                     {dataGranularity && dataGranularity.map(dgl =>
                                    
                                        {if(dataGranularityFilter.indexOf(dgl.code) !== -1){
                                            return  <option key={dgl.code} value={dgl.code}>{dgl.name}</option>
                                        }}
                                    )}
                                    
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt5">
                        <Col xs={12}  md={3} lg={3}>
                            <FormGroup className="flex center">
                                <ControlLabel>发行币种：</ControlLabel>
                                <FormControl componentClass="select" 
                                    value={currencyValue === "" ? "全部" : currencyValue}
                                    onChange={this.handleCurrencyChange}
                                >
                                    <option value="">请选择</option>
                                    {currency && currency.map(cuy => <option
                                        key={cuy.code} value={cuy.code}>{cuy.name}</option>)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={6} lg={6} className="marginAuto searCenter">
                            <Button bsStyle="primary" onClick={this.search}>查询</Button>
                            <Button style={{marginLeft: 30}} bsStyle="primary" onClick={this.reload}>重置</Button>
                        </Col>               
                    </Row>
                </form>
                <DoubleheadTable {...tableProps}></DoubleheadTable>
            </div>
        )
    }
}

Report.propTypes = {
    userInfo: PropTypes.object.isRequired,
    provinceList: PropTypes.array.isRequired,
    areaList: PropTypes.object.isRequired,
    cityList: PropTypes.object.isRequired,
    branchList: PropTypes.object.isRequired,
    brandList:PropTypes.array.isRequired,
    prodCodeList:PropTypes.array.isRequired,
    dictionariesData:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfoReducer.userInfo,
    dateTypeList: state.reportReducer.dateTypeList,
    provinceList: state.reportReducer.provinceList,
    areaList: state.reportReducer.areaList,
    cityList: state.reportReducer.cityList,
    branchList: state.reportReducer.branchList,
    brandList:state.reportReducer.brandList,
    prodCodeList:state.reportReducer.prodCodeList,
    dictionariesData:state.reportReducer.dictionariesData
})

const mapDispatchToProps = (dispatch) => ({
    fetchDataCallback: (fetchUrl, reqType, params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError) => dispatch(fetchDataCallback(fetchUrl, reqType, params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError)),
    setAreaList: (areaList) => dispatch(setAreaList(areaList)),
    setCityList: (cityList) => dispatch(setCityList(cityList)),
    setBranchList: (branchList) => dispatch(setBranchList(branchList))
})

export default connect(mapStateToProps,mapDispatchToProps)(Report)


