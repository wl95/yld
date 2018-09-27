import {INIT_USERINFO} from './actions'


/***
 * 初始化用户信息
 * @param userInfo
 * @returns {{type, userInfo: *}}
 */

export function initUserInfo(userInfo) {
    return{
        type:INIT_USERINFO,
        userInfo
    }
}