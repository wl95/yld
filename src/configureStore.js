import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

/**
 * 初始化redux的存储，以及中间件
 */


const loggerMiddleware = createLogger()

const enhancer = compose(
    //applyMiddleware(loggerMiddleware),
    applyMiddleware(thunkMiddleware)
)

export default function configureStore(preloadedState) {
    let store = createStore(
        rootReducer,
        preloadedState,
        enhancer,
    )
    window.store = store;
    return store;
}