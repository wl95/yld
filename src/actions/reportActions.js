import {INIT_PROVINCE_LIST,SET_AREA_LIST,SET_CITY_LIST,SET_BRANCH_LIST,INIT_BRAND_LIST,INIT_PRODCODE_LIST,INIT_DICTIONARIESDATA} from './actions'


/***
 *初始化省列表
 * @param provinceList
 * @returns {{type, provinceList: *}}
 */

export function initProvinceList(provinceList) {
    return{
        type:INIT_PROVINCE_LIST,
        provinceList
    }
}

/***
 * 设置地市列表
 * @param areaList
 * @returns {{type: string, areaList: *}}
 */
export function setAreaList(areaList) {
    return{
        type:SET_AREA_LIST,
        areaList
    }
}

/***
 * 设置市县列表
 * @param cityList
 * @returns {{type: string, cityList: *}}
 */
export function setCityList(cityList) {
    return{
        type:SET_CITY_LIST,
        cityList
    }
}

/***
 * 设置网点列表
 * @param branchList
 * @returns {{type: string, branchList: *}}
 */
export function setBranchList(branchList) {
    return{
        type:SET_BRANCH_LIST,
        branchList
    }
}



/***
 * 初始化产品品牌列表
 * @param brandList
 * @returns {{type: string, brandList: *}}
 */
export function initBrandList(brandList) {
    return{
        type:INIT_BRAND_LIST,
        brandList
    }
}

/***
 * 初始化产品代码列表
 * @param prodCodeList
 * @returns {{type: string, prodCodeList: *}}
 */
export function initProdCodeList(prodCodeList) {
    return{
        type:INIT_PRODCODE_LIST,
        prodCodeList
    }
}

/***
 * 初始化字典数据列表
 * @param dictionariesData
 * @returns {{type: string, dictionariesData: *}}
 */
export function initDictionariesData(dictionariesData) {
    return{
        type:INIT_DICTIONARIESDATA,
        dictionariesData
    }
}