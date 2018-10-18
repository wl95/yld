import {SET_FILTERDATA, SET_SEARCHDATA,SET_QUERY_DATA, GET_AUTH_DATA} from '../actions/actions'
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
      switch(juris.organLevel){
        case '0':
          newFilterData.map(item => {
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.disabled = false
              item.option = authData.children
            }
          })
          return {...state,filter:newFilterData}
        case '1':
          newFilterData.map(item => {
            if((item.selectType.toUpperCase() === 'PROVINCE_CODE' || item.selectType.toUpperCase() === 'PREFECTURE_CODE') && authData.children){
              item.disabled = false
              item.option = item.selectType === 'PROVINCE_CODE' ? authData.children : authData.brother
            }
          })
          return { ...state,filter:newFilterData }
        case '2':
          let { superior } = authData
          newFilterData.map( item => {
            if(item.selectType.toUpperCase() === 'PREFECTURE_CODE' || item.selectType.toUpperCase() === 'CITY_CODE') {
              item.disabled = false
              item.option = item.selectType === 'CITY_CODE' ?  authData.children : authData.brother
            }
            if(item.selectType.toUpperCase() === 'PROVINCE_CODE'){
              item.option = [superior.province]
              item.defaultValue = superior.province.code
            }
            if(item.selectType === 'ORGAN_LEVEL'){
              item.defaultValue = '2'
            }
          })
          return {...state,filter:newFilterData}
        case '3':
          newFilterData.map( item => {
            if(item.selectType.toUpperCase() === 'CITY_CODE'|| item.selectType.toUpperCase() === 'BRANCE_CODE'){
              item.disabled = false
              item.option = item.selectType === 'BRANCE_CODE' ?  authData.children : authData.brother
            }
          })
          return {...state,filter:newFilterData}
        case '4':
          newFilterData.map(item => {
            if(item.selectType.toUpperCase() === 'BRANCE_CODE'){
              item.disabled = false
              item.option = authData.children
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
        return {...state,list:queryData.data, total: queryData.total, totalPage: queryData.totalPage, }    
      default:
        return state
  } 
}