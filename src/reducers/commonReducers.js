import {FETCH_REQUEST,FETCH_SUCCESS,FETCH_FAILED} from '../actions/actions'
/**
 * 公用reducer
 */

const initState = {
    isFetching:false,//是否有请求
    errorMsg:''//请求错误信息
}

export default function commonReducer(state = initState, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                errorMsg:''
            })
        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching:false,
                errorMsg:''
            })
        case FETCH_FAILED:
            return Object.assign({}, state, {
                isFetching:false,
                errorMsg:action.errorMsg
            })

        default:
            return state
    }
}