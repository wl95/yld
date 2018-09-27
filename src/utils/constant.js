/**
 * 所有常量写在这里
 * */


/**
 *服务器地址配置
 */
export const INIT_ORGANCODE = '11005293'    //默认的总行机构号
export const INIT_ORGANLEVEL = '0'          //默认的总行机构等级

const SERVER_HOST = 'http://10.136.1.216/'    //服务器根地址

export const FETCH_URL_LOGIN = SERVER_HOST+'report/api/v1/Organization'//登录接口（暂时没有）

export const FETCH_URL_PROVINCE = SERVER_HOST+'report/api/v1/Organization'//省列表接口

export const FETCH_URL_AREA = SERVER_HOST+'report/api/v1/Organization/Area'//地市列表接口

export const FETCH_URL_CITY = SERVER_HOST+'report/api/v1/Organization/City'//市县列表接口

export const FETCH_URL_BRANCH = SERVER_HOST+'report/api/v1/Organization/Branch'//网点列表接口

export const FETCH_URL_BRAND = SERVER_HOST+'report/api/v1/Brand'//产品品牌列表接口

export const FETCH_URL_PRODCODE = SERVER_HOST+'report/api/v1/ProdCode'//产品代码列表接口

export const FETCH_URL_DICTIONARIESDATA = SERVER_HOST+'report/api/v1/DictionariesData'//数据字典中列表接口

export const FETCH_URL_HIGHERORGANMESSAGE = SERVER_HOST+'report/api/v1/Organization/HigherOrganMessage'//上级机构信息接口

export const FETCH_URL_FM_HOLDING = SERVER_HOST+'report/api/v1/fm/Holding'//查询理财产品日均保有量报表接口
