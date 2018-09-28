import {SET_FILTERDATA, SET_SEARCHDATA,SET_PAGE_DATAS, GET_AUTH_DATA} from '../actions/actions'
/**
 * 公用reducer
 */

const initState = {
    filter:[],   //查询条件的数据
    arr:[]
}

export function filterReducers(state = initState, action) {
   switch (action.type) {
        case SET_FILTERDATA:
          let { filterResult } = action
          let { filterData, index } = filterResult
          let newFilterData = state.filter.concat();
          newFilterData[index].option = filterData
          return {...state,filter:newFilterData}
        case SET_SEARCHDATA:
          let { searchData } = action
          return {...state,filter:searchData}
        case GET_AUTH_DATA:
          consoel.log(action.authData)
          return state
        default:
          return state
    }
}
export function fILETReducer(state=initState,action){
     switch(action.type){
      case SET_PAGE_DATAS:
       return {...state,arr:action.datas}
       break;
       default:
       return state
     }
}