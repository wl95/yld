import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route,NavLink} from 'react-router-dom'
import { Col } from 'react-bootstrap'
import BootstrapPage from '../test/bootstrapPage'
import './main.less'

const ArrySlide=[
    {"id":1,menu:"R01理财产品基本信息",path:'/productInformation'},
    {"id":2,menu:"R02封闭式非净值型理财产品平均客户收益率及投资收益率统计表",path:'/closedStatistics'},
    {"id":3,menu:"R03封闭式非净值型理财产品平均客户收益率及投资收益率序列表",path:'/closedSequence'},
    {"id":4,menu:"R04理财产品有效销量表",path:'/effectiveSales'},
    {"id":5,menu:"R05理财产品供给规模与销售规模序列表",path:'/scaleSequence'},
    {"id":6,menu:"R06机构理财产品客户销售情况表",path:'/salesStatusProductCustomers'},
    {"id":7,menu:"R07理财销售情况序列表",path:'/sequenceOfSales'},
    {"id":8,menu:"R08在售封闭式理财产品销售情况查询表",path:'/closedSale'},
    {"id":9,menu:"R09开放式理财产品销售情况查询表",path:'/openSales'},
    {"id":10,menu:"R10开放式产品销售情况序列表",path:'/openSalesSeries'},
    {"id":11,menu:"R11开放式非净值型理财产品成本统计表",path:'/openCostStatistics'},
    {"id":12,menu:"R12各分行理财产品销售情况统计表",path:'/branchSalesStatistics'},
    {"id":13,menu:"R13各理财产品销售情况统计表",path:'/productSalesStatistics'},
    {"id":14,menu:"R14机构理财客户产品交易情况表",path:'/customerProductTransaction'},
    {"id":15,menu:"R15各分行理财余额统计查询表",path:'/branchBalanceStatistics'},
    {"id":16,menu:"R16各分行理财余额变动统计表",path:'/changeBranchBalance'},
    {"id":17,menu:"R17各理财产品余额序列表",path:'/productBalanceSequence'},
    {"id":18,menu:"R18各分行发行自主平衡产品情况查询表",path:'/AutonomicBalance'},
    {"id":19,menu:"R19各分行理财产品日均保有量统计表",path:'/branchHoldings'},
    {"id":20,menu:"R20各理财产品日均保有量统计表",path:'/productQuantity'},
    {"id":21,menu:"R21各理财产品收入情况统计表",path:'/productRevenueStatistics'},
    {"id":22,menu:"R22各分行理财收入统计表",path:'/branchRevenueStatistics'},
    {"id":23,menu:"R23年度销售手续费总计提/已分配/待分配确认表",path:'/distributionOfProvision'},
    {"id":24,menu:"R24客户意向登记购买查询表",path:'/intentionToBuy'},
    {"id":25,menu:"R25扣款失败金额明细表",path:'/failureAmountDetails'},
    {"id":26,menu:"R26新增客户开户数",path:'/newlyOpenedAccounts'},
    {"id":27,menu:"R27各分行理财产品综合情况统计表",path:'/branchComprehensiveStatistics'},
    {"id":28,menu:"R28各理财产品综合情况统计表",path:'/comprehensiveProductStatistics'},
    {"id":29,menu:"R29周报数据查询表",path:'/weeklyDataQuery'}
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
                                return <NavLink onClick={this.onNavLink} to={`${this.props.match.path}`+item.path} key={item.id}>{item.menu}</NavLink>
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