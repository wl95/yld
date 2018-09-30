import {INIT_USERINFO} from '../actions/actions'

/**
 * 初始化用户信息
 */

const initStore = {
    userInfo: {
        userProvinceCode:"",
        userProvinceName:"",
        userAreaCode:"",
        userAreaName:"",
        userCityCode:"",
        userCityName:"",
        userBranchCode:"",
        userBranchName:""
    }

}

export default function userInfoReducer(state = initStore, action) {
    switch (action.type) {
        case INIT_USERINFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo
            })

        default:
            return state
    }
}