import APIpath from './APIpath'
import request from './request'
const { 
  filterAPI
} = APIpath


const CalcDiffTime = (stateTime, endTime, dateFormat) => {
  if(dateFormat === 'YYYY-MM-DD'){
    /**
    * 间隔天数
    */
    stateTime = new Date(stateTime.replace(/-/g, "/"));
    endTime = new Date(endTime.replace(/-/g, "/"));//当前日期：2017-04-24
    var days = endTime.getTime() - stateTime.getTime();
    var time = parseInt(days / (1000 * 60 * 60 * 24)) + 1;
    return JSON.stringify(time);
  }
  /**
   * 间隔月数
   */
  stateTime = stateTime.split("-");
  endTime = endTime.split("-");
  //获取年,月数
  var year1 = parseInt(stateTime[0]) , 
  month1 = parseInt(stateTime[1]) , 
  year2 = parseInt(endTime[0]) , 
  month2 = parseInt(endTime[1]) , 
  //通过年,月差计算月份差
  months = (year2 - year1) * 12 + (month2-month1)+1;
  if(dateFormat === 'YYYY-MM'){
    return JSON.stringify(months);   
  }
  years = year2 - year1;
  return JSON.stringify(years);   
}

function calcReportName(stateTime, endTime){

}

module.exports = {
  CalcDiffTime,
  filterAPI,
  request
}