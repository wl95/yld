import APIpath from './APIpath'
import request from './request'
import Lodash from 'lodash'
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

function JudgingForm(stateTime, endTime, ban){
  let calcDiffTime = CalcDiffTime(stateTime, endTime, 'YYYY-MM')
  if(calcDiffTime < 1 && !Lodash.includes(ban, 'D')){
    return 'D'
  }
  if(calcDiffTime >= 1 && calcDiffTime < 3 && !Lodash.includes(ban, 'M')){
    return 'M'
  }
  if(calcDiffTime >= 3 && calcDiffTime < 12&& !Lodash.includes(ban, 'Q')){
    return 'Q'
  }
  if(calcDiffTime >= 12&& !Lodash.includes(ban, 'Y')){
    return 'Y'
  }
}

function calcReportName(stateTime, endTime, areas, reportName){
  switch(reportName){
    case 'R03':
    case 'R10':
    case 'R17':
      return reportName + JudgingForm(stateTime, endTime, ['Q']);
    case 'R07':
      return reportName + JudgingForm(stateTime, endTime, []);
    case 'R04':
    case 'R21':
      return reportName + areas + 'M';
    case 'R12':
    case 'R27':
      return reportName + areas + 'D';
    case 'R11':
    case 'R24':
    case 'R25':
      return reportName + 'D';
    case 'R19':
      return reportName + 'D' + JudgingForm(stateTime, endTime, ['Q', 'Y']);
    default:
      return reportName + areas
  }
}

module.exports = {
  CalcDiffTime,
  calcReportName,
  filterAPI,
  request
}