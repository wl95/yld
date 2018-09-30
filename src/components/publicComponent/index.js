import React,{Fragment} from 'react';
import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import { connect } from 'react-redux'
import Filter from './filter'
import Table from './table'
import data from 'utils/datas.js'
import moment from "moment"
import { request, CalcDiffTime } from 'utils'

const PublicComponent = ({
    setSearch,
    queryList,
}) => {
    let { pathname } = location
    let pubChildren = pathname.split('/')[2]
    const filterProps = {   
        location,
        onFilterSubmit({filed, dateFormat}){
            let urls = "http://10.136.1.216:9091/v1/ycReport";
            for (let item in filed) {
                if(filed[item] instanceof Object){
                    filed[item] = filed[item].format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM')
                }
            }
            let {DATE_TYPE,UPDATE_DATE_START,UPDATE_DATE_END,ORGAN_LEVEL} =filed;
            let datas = {
                reportName:data[pubChildren].reportName,
                offset:1,
                limit:10,
                paramMap:{
                    DATE_TYPE,
                    GROUP_BY:"ORGAN_ID",
                    UPDATE_DATE_START:UPDATE_DATE_START,
                    UPDATE_DATE_END:UPDATE_DATE_END,
                    ORGAN_LEVEL:ORGAN_LEVEL,
                    DAY_INTERVAL:'10'
                    //DAY_INTERVAL:CalcDiffTime(UPDATE_DATE_START,UPDATE_DATE_END, dateFormat)
                },
                orderMap:{property:"period",direction:"DESC"}
            };
            /* location.search = queryString.stringify({
                DATE_TYPE,
                GROUP_BY:"ORGAN_ID",
                UPDATE_DATE_START:UPDATE_DATE_START,
                UPDATE_DATE_END:UPDATE_DATE_END,
                ORGAN_LEVEL:ORGAN_LEVEL,
                DAY_INTERVAL:JgTime
            })  */
            request({
                method:'get',
                data: {
                    reportParam:JSON.stringify(datas),
                },
                url:urls,
            }).then(resData => {
                console.log(resData)
                //console.log(resData.data.data)
                //queryList(resData.data)
            })
        }
    }
    setSearch(data[pubChildren] && data[pubChildren].search)
    const listProps = {
        tableResult:data[pubChildren] && data[pubChildren].tableResult,
        title:data[pubChildren] && data[pubChildren].title,
    }
    return  <Fragment>
                <Filter {...filterProps} /> 
                <Table {...listProps} />
            </Fragment>
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicComponent)