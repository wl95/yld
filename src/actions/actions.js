/**公用动作*/
export const FETCH_REQUEST = 'FETCH_REQUEST'//请求服务器数据
export const FETCH_SUCCESS = 'FETCH_SUCCESS'//请求成功
export const FETCH_FAILED = 'FETCH_FAILED'//请求失败

/**用户信息*/
export const INIT_USERINFO = 'INIT_USERINFO'//初始化用户信息

export const INIT_PROVINCE_LIST = 'INIT_PROVINCE_LIST'//初始化省列表

export const SET_AREA_LIST = 'SET_AREA_LIST'//设置当前地市列表

export const SET_CITY_LIST = 'SET_CITY_LIST'//设置当前市县列表

export const SET_BRANCH_LIST = 'SET_BRANCH_LIST'//设置当前网点列表

export const INIT_BRAND_LIST = 'INIT_BRAND_LIST'//初始化产品品牌列表

export const INIT_PRODCODE_LIST = 'INIT_PRODCODE_LIST'//初始化产品代码列表

export const INIT_DICTIONARIESDATA = 'INIT_DICTIONARIESDATA'//初始化字典表数据列表

export const SET_SEARCHDATA = 'SET_SEARCHDATA'  // 查询基础数据

export const SET_FILTERDATA = 'SET_FILTERDATA'  // 查询请求到得数据
export const SET_QUERY_DATA = 'SET_QUERY_DATA'  // 查询请求列表

export const GET_AUTH_DATA = "GET_AUTH_DATA"      // 用户权限
export const SET_DISABLE = "SET_DISABLE"          // 权限禁用无关选项 