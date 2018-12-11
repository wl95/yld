import React, {Component} from 'react';
import PublicComponent from '../publicComponent/index'


/**
 * 路由配置
 **/
let router = {
    routers:[
        {title:"R01理财产品基本信息",path:'/productInformation',component:PublicComponent},
        {title:"R02封闭式非净值型理财产品平均客户收益率及投资收益率统计表",path:'/closedStatistics',component:PublicComponent},
        {title:"R03封闭式非净值型理财产品平均客户收益率及投资收益率序列表",path:'/closedSequence',component:PublicComponent},
        {title:"R04理财产品有效销量表",path:'/effectiveSales',component:PublicComponent},
        {title:"R05理财产品供给规模与销售规模序列表",path:'/scaleSequence',component:PublicComponent},
        {title:"R06机构理财产品客户销售情况表",path:'/salesStatusProductCustomers',component:PublicComponent},
        {title:"R07理财销售情况序列表",path:'/sequenceOfSales',component:PublicComponent},
        {title:"R08在售封闭式理财产品销售情况查询表",path:'/closedSale',component:PublicComponent},
        {title:"R09开放式理财产品销售情况查询表",path:'/openSales',component:PublicComponent},
        {title:"R10开放式产品销售情况序列表",path:'/openSalesSeries',component:PublicComponent},
        {title:"R11开放式非净值型理财产品成本统计表",path:'/openCostStatistics',component:PublicComponent},
        {title:"R12各分行理财产品销售情况统计表",path:'/branchSalesStatistics',component:PublicComponent},
        {title:"R13各理财产品销售情况统计表",path:'/productSalesStatistics',component:PublicComponent},
        {title:"R14机构理财客户产品交易情况表",path:'/customerProductTransaction',component:PublicComponent},
        {title:"R15各分行理财余额统计查询表",path:'/branchBalanceStatistics',component:PublicComponent},
        {title:"R16各分行理财余额变动统计表",path:'/changeBranchBalance',component:PublicComponent},
        {title:"R17各理财产品余额序列表",path:'/productBalanceSequence',component:PublicComponent},
        {title:"R18各分行发行自主平衡产品情况查询表",path:'/AutonomicBalance',component:PublicComponent},
        {title:"R19各分行理财产品日均保有量统计表",path:'/branchHoldings',component:PublicComponent},
        {title:"R20各理财产品日均保有量统计表",path:'/productQuantity',component:PublicComponent},
        {title:"R21各理财产品收入情况统计表",path:'/productRevenueStatistics',component:PublicComponent},
        {title:"R22各分行理财收入统计表",path:'/branchRevenueStatistics',component:PublicComponent},
        {title:"R23年度销售手续费总计提/已分配/待分配确认表",path:'/distributionOfProvision',component:PublicComponent},
        {title:"R24客户意向登记购买查询表",path:'/intentionToBuy',component:PublicComponent},
        {title:"R25扣款失败金额明细表",path:'/failureAmountDetails',component:PublicComponent},
        {title:"R26新增客户开户数",path:'/newlyOpenedAccounts',component:PublicComponent},
        {title:"R27各分行理财产品综合情况统计表",path:'/branchComprehensiveStatistics',component:PublicComponent},
        {title:"R28各理财产品综合情况统计表",path:'/comprehensiveProductStatistics',component:PublicComponent},
        {title:"R29周报数据查询表",path:'/weeklyDataQuery',component:PublicComponent}
    ]
}
export default router;