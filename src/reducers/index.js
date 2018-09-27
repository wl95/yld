import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import userInfoReducer from './userInfoReducers' // 引入reducer
import commonReducer from './commonReducers'
import mainReducer from './mainReducers'
import reportReducer from './reportReducers'
import { filterReducers ,fILETReducer} from './pcReducers'

/***
 * 根reducers，所有新增的reducer都要在这里添加进来
 */
export default combineReducers({
    userInfoReducer,
    commonReducer,
    mainReducer,
    reportReducer,
    routing: routerReducer,
    filterReducers,
    fILETReducer
})