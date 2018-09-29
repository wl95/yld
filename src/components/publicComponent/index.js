import React,{Fragment,Component} from 'react';
import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import { connect } from 'react-redux'
import Filter from './filter'
import Table from './table'
import data from 'utils/datas.js'
import moment from "moment"
import axios from 'axios';
import queryString from 'query-string'
import Month from '../Calendar/Month.jsx'
import { request } from 'utils'
const PublicComponent = ({
    setSearch,
    queryList,
    SUPDATE_DATE_END
}) => {
    let { pathname } = location
    let pubChildren = pathname.split('/')[2]
    const filterProps = {   
        location,
        onFilterSubmit({filed, dateFormat}){
            /* for (let item in filed) {
                if(filed[item] instanceof Object){
                    filed[item] =  filed[item].format(dateFormat)
                }
            } */
            /**
            * 间隔天数
            */
            function Times(faultDate,completeTime){
                let stime = Date.parse(new Date(faultDate));
                let etime = Date.parse(new Date(completeTime));
                let usedTime = etime - stime;  //两个时间戳相差的毫秒数
                let days=Math.floor(usedTime/(24*3600*1000));
                //计算出小时数
                let leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
                let hours=Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                let leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                let minutes=Math.floor(leave2/(60*1000));
                let time = days+1;
                return time;
            }
            /**
             * 间隔月数
             */
            function getIntervalMonth(date1,date2){
                // console.log(date1)
                // console.log(date2)
                date1 = date1.split("-");
                date2 = date2.split("-");
                //获取年,月数
                var year1 = parseInt(date1[0]) , 
                month1 = parseInt(date1[1]) , 
                year2 = parseInt(date2[0]) , 
                month2 = parseInt(date2[1]) , 
                //通过年,月差计算月份差
                months = (year2 - year1) * 12 + (month2-month1)+1;
                return months;    
            }
            // queryList(filed)
            switch(pubChildren){
                case "publicComponent":
                    const {dateType,UPDATE_DATE_START,UPDATE_DATE_END,ORGAN_LEVEL} =filed;
                    let UPDATE_DATE_STARTs = moment(UPDATE_DATE_START).format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM');
                    let UPDATE_DATE_ENDs = moment(UPDATE_DATE_END).format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM')
                    let JgTime;
                    dateType === "0" ? JSON.stringify(JgTime = Times(UPDATE_DATE_START,UPDATE_DATE_END)) : JSON.stringify(JgTime=getIntervalMonth(moment(UPDATE_DATE_START).format('YYYY-MM'),moment(UPDATE_DATE_END).format('YYYY-MM')))
                    // console.log(JgTime)
                    let urls = "http://10.136.1.216:9091/v1/ycReport";
                    /* let datas = {
                        "reportName":"R19",
                        "offset":1,
                        "limit":10,
                        "paramMap":{
                            "DATE_TYPE":dateType,
                            "GROUP_BY":"ORGAN_ID",
                            "UPDATE_DATE_START":UPDATE_DATE_STARTs,
                            "UPDATE_DATE_END":UPDATE_DATE_ENDs,
                            "ORGAN_LEVEL":ORGAN_LEVEL,
                            "DAY_INTERVAL":JgTime
                        },
                        "orderMap":{"property":"period","direction":"DESC"}
                    }; */
                    let datas = {
                        "reportName": "R19",
                        "offset": 1,
                        "limit": 10,
                        "paramMap": {
                            "DATE_TYPE": "0",
                            "GROUP_BY": "ORGAN_ID",
                            "UPDATE_DATE_START": "20171111",
                            "UPDATE_DATE_END": "20171120",
                            "ORGAN_LEVEL": "1",
                            "DAY_INTERVAL": "10"
                        },
                        "orderMap": {
                            "property": "period",
                            "direction": "DESC"
                        }
                    };

                    /*  location.search = queryString.stringify({
                        "DATE_TYPE":dateType,
                        "GROUP_BY":"ORGAN_ID",
                        "UPDATE_DATE_START":UPDATE_DATE_START,
                        "UPDATE_DATE_END":UPDATE_DATE_END,
                        "ORGAN_LEVEL":ORGAN_LEVEL,
                        "DAY_INTERVAL":JgTime
                    }) */

                    axios({
                        method:'get',
                        // dataType: "json",
                        params: {
                            // reportParam:queryString.stringify(datas),
                            reportParam:JSON.stringify(datas),
                        },
                        url:urls,
                    }).then(resData => {
                        //console.log(resData)
                        if(resData.status==200&&resData.statusText=="OK"){
                            //console.log(resData.data.data)
                            SUPDATE_DATE_END(resData.data.data)
                        }
                    })
                break;
                /* case "branchBalanceStatistics":
                    const {UPDATE_DATE,GROUP_BY} =filed;
                    let month = moment(UPDATE_DATE).format('YYYYMM')
                    //console.log(month)
                    let data = {
                        "reportName":"R15",
                        "offset":1,
                        "limit":10,
                        "paramMap":{
                            "UPDATE_DATE":month,
                            "GROUP_BY":GROUP_BY == "1" ? "BRANCH" : "AREA"
                        },
                        "orderMap":{"property":"period","direction":"DESC"}
                    }
                    axios({
                        method:'get',
                        // dataType: "json",
                        data: JSON.stringify(data),
                        url:"http://10.136.1.216:9091/v1/ycReport",
                        }).then(resData => {
                        if(resData.status==200&&resData.statusText=="OK"){
                            // console.log(resData.data.data)
                            SUPDATE_DATE_END(resData.data.data)
                        }
                    })
                break; */
            }
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