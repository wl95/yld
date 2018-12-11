import {SET_FILTERDATA, SET_SEARCHDATA,SET_QUERY_DATA, GET_AUTH_DATA, CLEARFILTER} from '../actions/actions'
import {  } from 'antd'
/**
 * 公用reducer
 */

const initState = {
  filter:[],   //查询条件的数据
  list:[],
  total: 0,
  totalPage: 0,
}

export function filterReducers(state = initState, action) {
  let { filter } = state
  let newFilterData = filter.concat();
  if(!newFilterData){
    throw '暂无机构'
  }
  switch (action.type) {
    case SET_FILTERDATA:
      let { filterResult } = action
      let { filterData, index } = filterResult
      newFilterData[index].option = filterData
      return {...state,filter:newFilterData}
    case SET_SEARCHDATA:
      let { searchData } = action
      return {...state,filter:searchData}
    case GET_AUTH_DATA:
      let { resData } = action
      let { juris, authData } = resData
      let { superior } = authData
      switch(juris.organLevel){
        case '0':
        newFilterData.length > 0  && newFilterData.map(item => {
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.disabled = false
              item.option = authData.children
            }
            if(item.selectType.toUpperCase() === 'ORGAN_LEVEL'){
              item.defaultValue = '1';
              item.option = [
                {
                  "label":"省级",
                  "order":"1",
                  "value":"1"
                }
              ]
            }
          })
          /* if(item.selectType.toUpperCase() === 'ORGAN_LEVEL'){
            item.defaultValue = '1';
            item.option = [
              {
                "label":"省级",
                "order":"1",
                "value":"1"
              }
            ]
          } */
          return {...state,filter:newFilterData}
        case '1':
          newFilterData.map(item => {
            if((item.selectType.toUpperCase() === 'PROVINCE_CODE' || item.selectType.toUpperCase() === 'PREFECTURE_CODE') && authData.children){
              item.disabled = false
              item.option = item.selectType.toUpperCase() === 'PROVINCE_CODE' ? authData.brother : authData.children
            }
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.defaultValue = superior.current.code
            }
            if(item.selectType.toUpperCase() === 'ORGAN_LEVEL'){
              item.defaultValue = '1';
              item.option = [
                {
                  "label":"省级",
                  "order":"1",
                  "value":"1"
                },
                {
                  "label":"地市级",
                  "order":"1",
                  "value":"２"
                }
              ]
            }
          })
          return { ...state,filter:newFilterData }
        case '2':
          newFilterData.map( item => {
            if(item.selectType.toUpperCase() === 'PREFECTURE_CODE' || item.selectType.toUpperCase() === 'CITY_CODE') {
              //item.selectType.toUpperCase() === 'PREFECTURE_CODE'　&& (item.disabled = false)
              item.disabled = false
              item.option = item.selectType.toUpperCase() === 'PREFECTURE_CODE' ? authData.brother : authData.children
            }
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.option = [superior.province]
              item.defaultValue = superior.province.code
            }
            if(item.selectType.toUpperCase() === 'PREFECTURE_CODE'){
              item.defaultValue = superior.current.code
            }
            if(item.selectType.toUpperCase() === 'ORGAN_LEVEL'){
              item.defaultValue = '2';
              item.option = [
                {
                  "label":"地市级",
                  "order":"1",
                  "value":"2"
                },
                {
                  "label":"市县级",
                  "order":"1",
                  "value":"3"
                },
              ]
            }
          })
          return {...state,filter:newFilterData}
        case '3':
          newFilterData.map( item => {
            if(item.selectType.toUpperCase() === 'CITY_CODE'|| item.selectType.toUpperCase() === 'BRANCE_CODE'){
              item.disabled = false
              item.option = item.selectType.toUpperCase() === 'CITY_CODE' ?  authData.brother : authData.children
            }
            if(item.selectType.toUpperCase() === 'BRANCE_CODE'){
              item.disabled = false
            }
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.defaultValue = superior.province.code
              item.option = [superior.province]
            }
            if(item.selectType.toUpperCase() === 'PREFECTURE_CODE'){
              item.defaultValue = superior.area.code
              item.option = [superior.area]
            }
            if(item.selectType.toUpperCase() === 'CITY_CODE'){
              item.defaultValue = superior.current.code
            }
            if(item.selectType.toUpperCase() === 'ORGAN_LEVEL'){
              item.defaultValue = '3'
              item.option = [
                {
                  "label":"市县级",
                  "order":"1",
                  "value":"3"
                },
                {
                  "label":"网点级",
                  "order":"1",
                  "value":"4"
                },
              ]
            }
          })
          return {...state,filter:newFilterData}
        case '4':
          newFilterData.map(item => {
            if(item.selectType.toUpperCase() === 'BRANCE_CODE'){
              item.disabled = false
              item.option = authData.brother
            }
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.defaultValue = superior.province.code
              item.option = [superior.province]
            }
            if(item.selectType.toUpperCase() === 'PREFECTURE_CODE'){
              item.defaultValue = superior.area.code
              item.option = [superior.area]
            }
            if(item.selectType.toUpperCase() === 'CITY_CODE'){
              item.defaultValue = superior.city.code
              item.option = [superior.city]
            }
            if(item.selectType.toUpperCase() === 'BRANCE_CODE'){
              item.defaultValue = superior.current.code
            }
            if(item.selectType.toUpperCase() === 'ORGAN_LEVEL'){
              item.defaultValue = '4'
              item.option = [
                {
                  "label":"网点级",
                  "order":"1",
                  "value":"4"
                },
              ]
            }
          })
          return {...state,filter:newFilterData} 
        
        default:
          return state
      }
    case SET_QUERY_DATA:
      let { queryData } = action
      if(!queryData){
        return {...state}
      }
      return {...state,list:[...queryData.data], total: queryData.total, totalPage: queryData.totalPage, }    
    case CLEARFILTER:
    // console.log(1)
      return {...state,filter:[], list: [], total:0, totalPage:0}
    default:
      return state
  } 
}
