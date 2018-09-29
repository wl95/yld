import {SET_FILTERDATA, SET_SEARCHDATA, SET_QUERY_DATA,SET_PAGE_DATAS, GET_AUTH_DATA } from './actions'
import { request } from 'utils'
import { filterAPI } from 'utils/APIpath'
import mock from './mock'
const { organRange } = filterAPI
/***
 *设置当前页面查询内容
 * @param pageName
 * @returns {{type, pageName: *}}
 */
console.log(mock)
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
    return {
        type:SET_PAGE_DATAS,
        datas:PAGEdATE
    }
}
export function getAuthorityData(dispatch, juris){
    request({
        method:'get',
        url:`${organRange}`,
        data:juris
    }).then(resData => {
        let { data } = resData
        dispatch({
            type:GET_AUTH_DATA,
            resData:{
                juris,
                authData:data
            },
        })
    })
   /*  dispatch({
        type:GET_AUTH_DATA,
        resData:{
            juris,
            authData:mock.data
        },
    }) */
}