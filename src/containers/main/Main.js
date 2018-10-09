import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route,NavLink} from 'react-router-dom'
import { Col } from 'react-bootstrap'
import BootstrapPage from '../test/bootstrapPage'
import './main.less'

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

    onClickMenu = () => {
        this.setState({
            isShow:!this.state.isShow
        }, () => {
            //console.log(this.state)
        })
    }

    render() {

        /**根据浏览器中的url来区分当前导航条的选中项*/
        const pathArray = this.props.location.pathname.split("/")
        const { isShow } = this.state
        /** end */

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
                </Col>
            </div>
        )
    }
}

Main.propTypes = {
    userInfo: PropTypes.object.isRequired,
}

export default Main