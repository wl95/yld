import { SET_FILTERDATA, SET_SEARCHDATA, SET_QUERY_DATA, GET_AUTH_DATA } from './actions'
import { request } from 'utils'
import { filterAPI } from 'utils/APIpath'
const { organRange, ycReport } = filterAPI
/***
 *设置当前页面查询内容
 * @param pageName
 * @returns {{type, pageName: *}}
 */
export function setFilterData( filterData, index ) {
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
    request({
        method:'get',
        data: {
            reportParam:JSON.stringify(queryData),
        },
        url:ycReport,
    }).then(resData => {
        return{
            type:SET_QUERY_DATA,
            queryData:resData,
        }
    })
}

export function getAuthorityData( dispatch, juris ){
    request({
        method:'get',
        url:`${organRange}`,
        data:{
            organParams:juris
        }
    }).then( resData => {
        dispatch({
            type:GET_AUTH_DATA,
            resData:{
                juris,
                authData:resData
            },
        })
    })
}