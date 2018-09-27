import {SET_FILTERDATA, SET_SEARCHDATA, SET_QUERY_DATA,SET_PAGE_DATAS} from './actions'
import { request } from 'utils'
import { apiPrefix } from 'utils/APIpath/common'
/***
 *设置当前页面查询内容
 * @param pageName
 * @returns {{type, pageName: *}}
 */

export function setFilterData(filterData, index) {
    return{
        type:SET_FILTERDATA,
        filterResult:{filterData, index}
    }
}

export function setSearchData(searchData) {
    return{
        type:SET_SEARCHDATA,
        searchData,
    }
}

export function queryListData(queryData) {
    return{
        type:SET_QUERY_DATA,
        queryData:queryData,
    }
    // request({
    //     method:'post',
    //     url:`${apiPrefix}/ycReport`,
    //     data:queryData
    // }).then(resData => {
    //     return{
    //         type:SET_QUERY_DATA,
    //         queryData:resData,
    //     }
    // })

}

export function setDATE(PAGEdATE){
    console.log(PAGEdATE)
    return {
        type:SET_PAGE_DATAS,
        datas:PAGEdATE
    }
}