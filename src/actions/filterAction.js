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

export function setSearchData( searchData ) {
    return{
        type:SET_SEARCHDATA,
        searchData,
    }
}

export function queryListData ( queryData ) {
    // 日daily  月monthily  季度qusrterily  年yearily
    let { reportName, organCode, time, ...other } = queryData
    request({
        method:'get',
        data: {
            reportParam:JSON.stringify(other),
        },
        url:`${ycReport}/${reportName}/${organCode}/${time}`,
    }).then(resData => {
        // console.log(resData)
        return{
            type:SET_QUERY_DATA,
            queryData:resData,
        }
    })
    return {
        type:SET_QUERY_DATA,
    }
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