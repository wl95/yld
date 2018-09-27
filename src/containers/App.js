import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initUserInfo} from "../actions/initUserInfoActions"
import {Route} from 'react-router-dom'
import data from 'utils/datas.js'
import LoadingDialog from "components/comman/LoadingDialog"

import LoginBootstrap from './login/LoginBootStrap'
import Login from './login/Login'
import BootstrapPage from './test/bootstrapPage'
import AntdPage from './test/antdPage'
import TestFetch from './test/TestFetch'
import PublicComponent from 'components/publicComponent'
import routeConfig from 'components/routeConfig'

import Main from "./main/Main";
import BootstrapsPage from './bootstrapsPage/bootstrapsPage'
import '../utils/test.html'

// import TestSelect from './common';

import {FETCH_URL_HIGHERORGANMESSAGE, INIT_ORGANCODE, INIT_ORGANLEVEL} from "../utils/constant";
import {fetchDataCallback} from "../actions/commonActions";

/***
 * 根容器界面
 */

class App extends Component {
    constructor(props) {
        super(props)
        //初始化用户信息，所以路由都会走这里
        const organCode=this.props.match.params.organCode

        if(organCode!==INIT_ORGANCODE){
            let params = {organCode:organCode}
            //请求
            /* this.props.fetchDataCallback(FETCH_URL_HIGHERORGANMESSAGE,
                'GET',
                params,
                (json) => {
                    let userInfo = {userOrganCode: organCode,
                        userOrganLevel: json.organLevel,
                        userProvinceCode:json.provinceCode,
                        userProvinceName:json.provinceName,
                        userAreaCode:json.areaCode,
                        userAreaName:json.areaName,
                        userCityCode:json.cityCode,
                        userCityName:json.cityName,
                        userBranchCode:json.branchCode,
                        userBranchName:json.branchName}
                    this.props.initUser(userInfo)
                    console.log("App=====initUser===")
                },
                null,
                false,
                true) */
        }
    }

    componentWillMount() {
        // let user = {uid: this.props.match.params.uid}
        // this.props.initUser(user)
    }

    render() {
        // console.log("render**************App")
        const {isFetching, location} = this.props
        // console.log(this.props.match.path)
        return (
            <Fragment>
                {/*所有页面路由写在这里*/}
                {/* <Route path={`${this.props.match.path}/testfetch`} component={TestFetch}/> */}
                <Route path={`${this.props.match.path}/login`} component={Login}/>
                {/* <Route path={`${this.props.match.path}/loginbootstrap`} component={LoginBootstrap}/>
                <Route path={`${this.props.match.path}/main`} component={Main}/> */}
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