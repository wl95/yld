import {SET_FILTERDATA, SET_SEARCHDATA,SET_PAGE_DATAS, GET_AUTH_DATA,SET_DISABLE} from '../actions/actions'
/**
 * 公用reducer
 */

const initState = {
    filter:[],   //查询条件的数据
    arr:[],
    authData:{}
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
          let { authData } = action
            return {...state, authData:authData.data}
        case SET_DISABLE:
        //let { authData } = state
        console.log(state)
          switch(action.organLevel){
            case '0':
              newFilterData.map(item => {
                if(item.selectType === 'PROVINCE_CODE'){
                  item.disabled = false
                 // item.option = authData.children
                }
              })
              console.log(newFilterData)
              return {...state,filter:newFilterData}
            case '1':
              newFilterData.map(item => {
                if(item.selectType === 'PROVINCE_CODE' || item.selectType === 'PREFECTURE_CODE' ){
                  item.disabled = false
                  //item.option = 
                }
              })
              console.log(newFilterData)
              return {...state,filter:newFilterData}
            case '2':
              newFilterData.map(item => {
                if(item.selectType === 'PREFECTURE_CODE' || item.selectType === 'CITY_CODE') {
                  item.disabled = false
                  //item.option = 
                }
              })
              console.log(newFilterData)
              return {...state,filter:newFilterData}
            case '3'                                :
              newFilterData.map(item => {
                if(item.selectType === 'CITY_CODE'|| item.selectType === 'BRANCE_CODE'){
                  item.disabled = false
                  //item.option = 
                }
              })
              console.log(newFilterData)
              return {...state,filter:newFilterData}
            case '4':
              newFilterData.map(item => {
                if(item.selectType === 'BRANCE_CODE'){
                  item.disabled = false
                  //item.option = 
                }
              })
              console.log(newFilterData)
              return {...state,filter:newFilterData}                        
            default:
              return state
          }
          break 
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