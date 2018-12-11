import { apiPrefix, apiPrefixV1, apiPrefixs, apiPre } from './common'

export default {
  province: `${apiPrefix}/RE_ORGANIZATION.json`,                           // 省列表接口
  holding: `${apiPrefix}/fm/Holding.json`,                                 // 查询理财产品日均保有量报表接口
  dChnl:`${apiPrefix}/D_CHNL.json`,                                        // 销售渠道  
  reCustomerType:`${apiPrefix}/RE_CUSTOMER_TYPE.json`,                     // 发售对象
  reProdoperModel:`${apiPrefix}/RE_PRODOPERMODEL.json`,                    // 产品运作模式
  reOrganType:`${apiPrefix}/RE_ORGAN_TYPE.json`,                           // 销售机构  机构属性
  reProper:`${apiPrefix}/REPROPERTIESCODE.json`,                           // 机构客户
  reQueryWeek:`${apiPrefix}/RE_QUERYWEEK.json`,                            // 查询周期
  dCustomerType:`${apiPrefix}/D_CUSTOMER_TYPE.json`,                       // 投资者类型
  reAreaType:`${apiPrefix}/RE_AREATYPE.json`,                              // 地区分类
  prodStatus:`${apiPrefix}/PROD_STATUS.json`,                              // 产品状态
  dSjld:`${apiPrefix}/D_SJLD.json`,                                        // 数据粒度
  regCurrency:`${apiPrefix}/REG_CURRENCY.json`,                            // 币种
  balance:`${apiPrefix}/RE_AUTO_BALANCE.json`,                             // 是否自主平衡  拟续接  待续接
  reProfitType:`${apiPrefix}/RE_PROFIT_TYPE.json`,                         // 产品收益类型
  reBrand:`${apiPrefix}/RE_BRAND.json`,                                    // 产品品牌
  reProdCode:`${apiPrefix}/RE_PRODCODE.json`,                              // 产品代码
  reDicticnariesdatae:`${apiPrefix}/RE_DICTIONARIESDATA.json`,             // 字典表数据
  reHolding:`${apiPrefix}/RE_HOLDING.json`,                                // 理财产品日均保有量
  productName:`${apiPre}/productName`,                                     // 产品名称
  projectName:`${apiPre}/projectName`,                                     // 项目名称
  productDeveloper:`${apiPre}/productDeveloper`,                           // 产品研发人
  projectDeveloper:`${apiPre}/projectDeveloper`,                           // 项目研发人
  organRange:`${apiPrefixs}`,                                              // 用户权限
  ycReport:`${apiPrefixV1}`,                                               // 列表查询
  saleRange:`${apiPrefix}/RE_SALES_REGION.json`,                           // 产品销售区域
}