import { SET_FILTERDATA, SET_SEARCHDATA, SET_QUERY_DATA, GET_AUTH_DATA, CLEARFILTER } from './actions'
import { request } from 'utils'
import { filterAPI } from 'utils/APIpath'
const { organRange, ycReport } = filterAPI
/***
 *设置当前页面查询内容
 * @param pageName
 * @returns {{type, pageName: *}}
 */
export function setFilterData(filterData, index) {
    return {
        type: SET_FILTERDATA,
        filterResult: { filterData, index }
    }
}

export function clearFilter() {
    return {
        type: CLEARFILTER,
    }
}

export function setSearchData(searchData) {
    return {
        type: SET_SEARCHDATA,
        searchData,
    }
}

export function queryListData(queryData) {
    //console.log(queryData);
    return (dispatch) => {
        // 日daily  月monthily  季度qusrterily  年yearily
        let { organCode, time, ...other } = queryData
        //console.log(time)
        if (other.reportName !== 'weeklyDataQuery'){
            request({
                method: 'get',
                // data: other,
                // url:`${ycReport}/${reportName}/${organCode ? organCode : '00000000'}/${time}`,
                url: `${ycReport}/${JSON.stringify(other)}`,
                /* url: `${ycReport}/{"reportName" : "R19","offset":1,"limit":10,
                "paramMap":{"date_type":"daily","group_by":"organ_id","start_date":"20171111",
                "end_date":"20171120","organ_level":"1","day_interval":"10"},
                "orderMap":{"property":"period","direction":"DESC"}}` */
            }).then(resData => {
                //console.log(resData);
                dispatch({
                    type: SET_QUERY_DATA,
                    queryData: resData,
                });
            })
        } else{
            let arrList = ['table1','table2','table3','table4','table5']
            arrList.map((item,index) => {
                // console.log(item);
                other.paramMap.table_name = item
                request({
                    method: 'get',
                    // data: other,
                    // url:`${ycReport}/${reportName}/${organCode ? organCode : '00000000'}/${time}`,
                    url: `${ycReport}/${JSON.stringify(other)}`,
                    /* url: `${ycReport}/{"reportName" : "R19","offset":1,"limit":10,
                    "paramMap":{"date_type":"daily","group_by":"organ_id","start_date":"20171111",
                    "end_date":"20171120","organ_level":"1","day_interval":"10"},
                    "orderMap":{"property":"period","direction":"DESC"}}` */
                }).then(resData => {
                    // console.log(resData);
                    dispatch({
                        type: SET_QUERY_DATA,
                        queryData: resData,
                    });
                })
            })
        }
    }
}

export function getAuthorityData(dispatch, juris) {
    request({
        method: 'get',
        url: `${organRange}`,
        data: {
            organParams: juris
        }
    }).then(resData => {
        dispatch({
            type: GET_AUTH_DATA,
            resData: {
                juris,
                authData: resData
            },
        })
    })
}