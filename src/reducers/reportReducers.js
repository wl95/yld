import {
    INIT_PROVINCE_LIST,SET_AREA_LIST,SET_CITY_LIST,SET_BRANCH_LIST,INIT_BRAND_LIST,INIT_PRODCODE_LIST,INIT_DICTIONARIESDATA
} from '../actions/actions'

/**
 * report界面reducer
 */

const initStore = {
    dateTypeList:[{code:"0",name:"日"},{code:"1",name:"月"}],
    provinceList: [],
    areaList:{},
    cityList:{},
    branchList:{},
    brandList:[],
    prodCodeList:[],
    dictionariesData:{}
}

export default function reportReducer(state = initStore, action) {
    switch (action.type) {
        case INIT_PROVINCE_LIST:
            return {...state,provinceList:action.provinceList}
        case SET_AREA_LIST:
            return {...state,areaList:{...state.areaList,[action.areaList.provinceCode]:action.areaList.areaList}}
        case SET_CITY_LIST:
            return {...state,cityList:{...state.cityList,[action.cityList.areaCode]:action.cityList.cityList}}
        case SET_BRANCH_LIST:
            return {...state,branchList:{...state.branchList,[action.branchList.cityCode]:action.branchList.branchList}}
        case INIT_BRAND_LIST:
            return {...state,brandList:action.brandList}
        case INIT_PRODCODE_LIST:
            return {...state,prodCodeList:action.prodCodeList}
        case INIT_DICTIONARIESDATA:
            return {...state,dictionariesData:action.dictionariesData}
        default:
            return state
    }
}