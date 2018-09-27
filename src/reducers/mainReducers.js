import {
    SET_PAGENAME
} from '../actions/actions'

/**
 * main界面reducer
 */

const initStore = {
    pageName: ""

}

export default function mainReducer(state = initStore, action) {
    switch (action.type) {
        case SET_PAGENAME:
            return {...state,pageName:action.pageName}

        default:
            return state
    }
}