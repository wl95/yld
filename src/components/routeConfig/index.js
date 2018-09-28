import React, {Component} from 'react';
import PublicComponent from '../publicComponent/index'


/**
 * 路由配置
 **/
let router = {
    routers:[
        {
            path:'/publicComponent',
            title:'各分行理财产品日均保有量统计表',
            component:PublicComponent
        },
        ,
        {
            path:'/productReport',
            title:'各理财产品日均保有量统计表',
            component:PublicComponent
        },
        {
            path:'/information',
            title:'理财产品基本信息表',
            component:PublicComponent
        },
        {
            path:'/closeStatistics',
            title:'封闭式非净值型理财产品平均客户收益率及投资收益率统计表',
            component:PublicComponent
        },
        {
            path:'/closedSequence',
            title:'封闭式非净值型理财产品平均客户收益率及投资收益率序列表',
            component:PublicComponent
        },
        {
            path:'/effectiveSales',
            title:'理财产品有效销量表',
            component:PublicComponent
        },
        {
            path:'/scaleSequence',
            title:'理财产品供给规模与销售规模序列表',
            component:PublicComponent
        },
        {
            path:'/customerSales',
            title:'机构理财产品客户销售情况表',
            component:PublicComponent
        },
        {
            path:'/saleStatuSequence',
            title:'理财销售情况序列表',
            component:PublicComponent
        },
        {
            path:'/closeSalesEnquiries',
            title:'在售封闭式理财产品销售情况查询表',
            component:PublicComponent
        },
        {
            path:'/openSalesEnquiries',
            title:'开放式理财产品销售情况查询表',
            component:PublicComponent
        },
        {
            path:'/openSaleSequence',
            title:'开放式产品销售情况序列表',
            component:PublicComponent
        },
        {
            path:'/branchSaleStatistics',
            title:'各分行理财产品销售情况统计表',
            component:PublicComponent
        },
        {
            path:'/productSaleStatistics',
            title:'各理财产品销售情况统计表',
            component:PublicComponent
        },
        {
            path:'/customerProductTrading',
            title:'机构理财客户产品交易情况表',
            component:PublicComponent
        },
        {
            path:'/branchBalanceStatistics',
            title:'各分行理财余额统计查询表',
            component:PublicComponent
        },
        {
            path:'/balanceChangeStatistics',
            title:'各分行理财余额变动统计表',
            component:PublicComponent
        },
        {
            path:'/productBalanceSequence',
            title:'各理财产品余额序列表',
            component:PublicComponent
        },
        {
            path:'/branchBalanceEnquiry',
            title:'各分行发行自主平衡产品情况查询',
            component:PublicComponent
        },
        {
            path:'/productRevenueStatistics',
            title:'各理财产品收入情况统计表',
            component:PublicComponent
        },
        {
            path:'/branchRevenueStatistics',
            title:'各分行理财收入统计表',
            component:PublicComponent
        },
        {
            path:'/annualWithdrawing',
            title:'年度销售手续费总计提/已分配/待分配确认表',
            component:PublicComponent
        },
        {
            path:'/purchaseIntentionEnquiry',
            title:'客户意向登记购买查询表',
            component:PublicComponent
        },
        {
            path:'/newCustomer',
            title:'新增客户开户数',
            component:PublicComponent
        },
        {
            path:'/branchComprehensiveStatistic',
            title:'各分行理财产品综合情况统计表',
            component:PublicComponent
        },
        {
            path:'/comprehensiveProductStatistics',
            title:'各理财产品综合情况统计表',
            component:PublicComponent
        },
        {
            path:'/weeklyQuery',
            title:'周报数据查询表',
            component:PublicComponent
        }
    ]
}
export default router;