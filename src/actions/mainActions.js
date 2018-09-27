import {SET_PAGENAME} from './actions'


/***
 *设置当前页面名称（暂时不用）
 * @param pageName
 * @returns {{type, pageName: *}}
 */

export function setPageName(pageName) {
    return{
        type:SET_PAGENAME,
        pageName
    }
}