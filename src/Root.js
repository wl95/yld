import App from './containers/App'
import React from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

/**
 * 配置根路由以及redux
 * */

const Root = ({store, location}) => (
    <Provider store={store}>
        <BrowserRouter> 
            <Switch>
                <Redirect exact from="/" to="/Home/managemoney"/> 
                <Route location={location} path="/Home" component={App}/> 
            </Switch>   
        </BrowserRouter>
    </Provider>

)

export default Root