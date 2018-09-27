import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route,NavLink,Redirect} from 'react-router-dom'
import {fetchDataCallback} from "../../actions/commonActions"
import {initProvinceList,initBrandList,initProdCodeList,initDictionariesData} from "../../actions/reportActions"
import { Col } from 'react-bootstrap'
import BootstrapPage from '../test/bootstrapPage'
// import BootstrapsPage from '../bootstrapsPage/bootstrapsPage'
import PublicComponent from '../../components/publicComponent'
import {setPageName} from "../../actions/mainActions";
// import RoueterWrapper from '../../components/routerWrapper/index'
// import datas from '../../../datas.js'


import styles from './main.less'
const ArrySlide=[
    
    {"id":1,menu:"各分行理财产品日均保有量统计表",path:'/publicComponent'},
    {"id":2,menu:"各理财产品日均保有量统计表",path:'/productReport'},
    {"id":3,menu:"理财产品基本信息",path:'/information'},
    {"id":4,menu:"封闭式非净值型理财产品平均客户收益率及投资收益率统计",path:'/closeStatistics'},
    {"id":5,menu:"封闭式非净值型理财产品平均客户收益率及投资收益率序列",path:'/closedSequence'},
    {"id":6,menu:"理财产品有效销量",path:'/effectiveSales'},
    {"id":7,menu:"理财产品日供给规模与销售规模",path:'/scaleSequence'},
    {"id":8,menu:"机构理财产品客户销售情况",path:'/customerSales'},
    {"id":9,menu:"理财销售情况序列",path:'/saleStatuSequence'},
    {"id":10,menu:"在售封闭式理财产品销售情况查询",path:'/closeSalesEnquiries'},
    {"id":11,menu:"开放式理财产品销售情况查询",path:'/openSalesEnquiries'},
    {"id":12,menu:"开放式产品销售序列表",path:'/openSaleSequence'},
    {"id":13,menu:"各分行理财产品销售情况统计",path:'/branchSaleStatistics'},
    {"id":14,menu:"各理财产品销售情况统计",path:'/productSaleStatistics'},
    {"id":15,menu:"机构理财客户产品交易情况",path:'/customerProductTrading'},
    {"id":16,menu:"各分行理财余额统计查询",path:'/branchBalanceStatistics'},
    {"id":17,menu:"各分行理财余额变动统计",path:'/balanceChangeStatistics'},
    {"id":18,menu:"理财产品余额序列",path:'/productBalanceSequence'},
    {"id":19,menu:"各分行发行自主平衡产品情况查询",path:'/branchBalanceEnquiry'},
    {"id":20,menu:"各理财产品收入情况统计",path:'/productRevenueStatistics'},
    {"id":21,menu:"各分行理财收入统计",path:'/branchRevenueStatistics'},
    {"id":22,menu:"年度销售手续费总计提已分配待分配确认",path:'/annualWithdrawing'},
    {"id":23,menu:"客户意向登记购买查询",path:'/purchaseIntentionEnquiry'},
    {"id":24,menu:"新增客户开户数",path:'/newCustomer'},
    {"id":25,menu:"各分行理财产品综合情况统计",path:'/branchComprehensiveStatistic'},
    {"id":26,menu:"各理财产品综合情况统计",path:'/comprehensiveProductStatistics'},
    {"id":27,menu:"周报数据查询",path:'/weeklyQuery'}
]
/**
 * 登录后的主页容器
 */

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow:true
        }
    }

    /***
     * 点击导航条的跳转路由函数
     */
    toPage=(pageName)=>{
        this.props.history.replace(this.props.match.url+pageName)
    }

    onClickMenu = () => {
        this.setState({
            isShow:!this.state.isShow
        }, () => {
            //console.log(this.state)
        })
    }

    render() {
        // console.log("render**************Main"+this.props.match.url)

        /**根据浏览器中的url来区分当前导航条的选中项*/
        const pathArray = this.props.location.pathname.split("/")
        const selectedKey=[pathArray[pathArray.length-1]]
        const openKey=[pathArray[pathArray.length-2]]
        const { isShow } = this.state
        /** end */

        //console.log(this.props);
        //console.log(datas2.default)

        return (
            <div className="main">
                <Col className="asideLeft" md={2} lg={2} xs={2}>
                    <NavLink to={`${this.props.match.path}/home`}>Home</NavLink>
                    <div className="menu">
                        <span onClick={this.onClickMenu}>理财</span>
                        <div className={'menuList' + (isShow ? ' disb' : '')}>
                        {
                            ArrySlide.map((item,ind)=>{
                                return <NavLink to={`${this.props.match.path}`+item.path} key={item.id}>{item.menu}</NavLink>
                            })
                        }
                        </div>
                    </div>
                </Col>
                <Col className="partRight" md={10} lg={10} xs={10}>
                    <Route path={`${this.props.match.path}/home`} component={BootstrapPage}/>
                    {/* <Route path={`${this.props.match.path}/home`} component={BootstrapsPage}/> */}
                   
                    
                   {/*  {
                        datas.default && datas.default.map((item,key) => {
                            return  <Route key={key} path={`${this.peops.match.path}/item`} component={PublicComponent}/>
                        })
                    } */}

                    {/* <RouterWrapper routes={router.routers} prop={this.props}/> */}
                </Col>
            </div>
        )
    }
}

Main.propTypes = {
    userInfo: PropTypes.object.isRequired,
    pageName: PropTypes.string.isRequired,
    provinceList:PropTypes.array.isRequired,
    brandList:PropTypes.array.isRequired,
    prodCodeList:PropTypes.array.isRequired,
    dictionariesData:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfoReducer.userInfo,
    pageName:state.mainReducer.pageName,
    provinceList:state.reportReducer.provinceList,
    brandList:state.reportReducer.brandList,
    prodCodeList:state.reportReducer.prodCodeList,
    dictionariesData:state.reportReducer.dictionariesData
})

const mapDispatchToProps = (dispatch) => ({
    fetchDataCallback: (fetchUrl, reqType, params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError) => dispatch(fetchDataCallback(fetchUrl, reqType, params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError)),
    setPageName:(pageName)=>dispatch(setPageName(pageName)),
    initProvinceList:(provinceList)=>dispatch(initProvinceList(provinceList)),
    initBrandList:(brandList)=>dispatch(initBrandList(brandList)),
    initProdCodeList:(prodCodeList)=>dispatch(initProdCodeList(prodCodeList)),
    initDictionariesData:(dictionariesData)=>dispatch(initDictionariesData(dictionariesData))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)