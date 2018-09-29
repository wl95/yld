import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initUserInfo} from "../actions/initUserInfoActions"
import {Route} from 'react-router-dom'
import LoadingDialog from "components/comman/LoadingDialog"
import Login from './login/Login'
import routeConfig from 'components/routeConfig'
import { request } from 'utils'
import BootstrapsPage from './bootstrapsPage/bootstrapsPage'

import {fetchDataCallback} from "../actions/commonActions";

/***
 * 根容器界面
 */

class App extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const {isFetching, location} = this.props
        // console.log(this.props.match.path)
        return (
            <Fragment>
                {/*所有页面路由写在这里*/}
                <Route path={`${this.props.match.path}/login`} component={Login}/>
                <Route path={`${this.props.match.path}/managemoney`} component={BootstrapsPage}/>
                {
                    routeConfig && routeConfig.routers.map((item,index) => {
                        return  <Route key={index} path={`${this.props.match.path}${item.path}`}  render={() => {
                            return <item.component location={location}/>
                        }}/>
                    })
                }
                {/*判断是否有请求，显示加载动画框*/}
                {isFetching && <LoadingDialog/>}
            </Fragment>
        )
    }
}

App.propTypes = {
    userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfoReducer.userInfo,
    isFetching: state.commonReducer.isFetching
})

const mapDispatchToProps = (dispatch) => ({
    initUser: (userInfo) => dispatch(initUserInfo(userInfo)),
    fetchDataCallback: (fetchUrl, reqType, params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError) => dispatch(fetchDataCallback(fetchUrl, reqType, params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)