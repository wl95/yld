import fetch from 'isomorphic-fetch'
import {FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED} from './actions'

/***
 * 公用动作
 */


//开始请求
function requestData() {
    return {
        type: FETCH_REQUEST,
    }
}

//请求成功
function reciveData() {
    return {
        type: FETCH_SUCCESS
    }
}

//请求失败
function reciveError(errorMsg) {
    /* if (errorMsg !== '') {
        message.config({
            maxCount: 1
        });
        message.error("" + errorMsg)//提示错误
    }
    return {
        type: FETCH_FAILED,
        errorMsg: errorMsg
    } */
}

/***
 * 带有回调函数的请求
 * @param fetchUrl 请求地址
 * @param reqType 请求类型   resfful：GET,POST,PUT,DELETE
 * @param params   请求参数  opt：接口号    userInfo：用户信息    info：参数
 * @param successCallback   成功回调
 * @param failedCallback   失败回调
 * @param isOpenLoadingDialog  是否显示加载进度框
 * @param isAlertError 是否提示错误信息
 * @returns {function(*)}
 */

export const fetchDataCallback = (fetchUrl, reqType, params, successCallback = null, failedCallback = null, isOpenLoadingDialog = true, isAlertError = true) => {
    // let info=JSON.stringify(params.info);
    // let body = `opt=${params.opt}&auth={"siteId":"1","UID":${params.userInfo.uid}}&info=${info}`
    // console.log(params)
    let body = JSON.stringify(params)
    let fetchParams = {
        method: reqType,// *GET, POST, PUT, DELETE
        mode: 'cors',// no-cors, cors, *same-origin
        headers: {
            // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
           // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
           'Content-Type': 'application/json; charset=UTF-8',
            // 'Access-Control-Allow-Origin': '*',
            // 'Content-Type': 'text/plain;charset=UTF-8',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
        }
    }

    // console.log("body====info=" + JSON.stringify(params.info))
    // console.log("reqType====" + reqType)
    // console.log("body====" + JSON.stringify(body))

    return dispatch => {
        if (isOpenLoadingDialog) {
            dispatch(requestData())//发出请求开始动作，会显示加载动画框
        }
        if (reqType.toUpperCase() === 'GET') {
            fetchUrl = fetchUrl + '?'
            for (let [key, value] of Object.entries(params)) {
                fetchUrl = fetchUrl + key + '=' + value + '&'
            }
            if (fetchUrl.endsWith('&') || fetchUrl.endsWith('?')) {
                fetchUrl = fetchUrl.substring(0, fetchUrl.length - 1)
            }
            console.log("fetchurl=====" + fetchUrl)
        } else {
            fetchParams.body = body
        }

        return fetch(fetchUrl, fetchParams).then(res => {
            // console.log(fetchUrl);
            // console.log(res);
            // console.log(res.json().then((aaa)=>{
            //     console.log(aaa);
            // }));

            // console.log("status====" + res.status)

            let resStatus = res.status

            if (resStatus === 200) {
                res.json().then(jsonResult => {
                    //console.log(jsonResult);
                    dispatch(reciveData())//发出请求成功动作，会关闭加载动画框
                    if (successCallback) {//如果回调函数存在，把数据传回去
                        successCallback(jsonResult)
                       //  console.log("response.json====" + JSON.stringify(jsonResult))
                    }
                })
            } else if (resStatus === 403) {
                res.json().then(jsonResult => {
                    // let errorCode=jsonResult.errorCode
                    let errorMessage = jsonResult.errorMessage
                    if (isAlertError) {//如果需要提示错误信息
                        dispatch(reciveError(errorMessage))//发出请求失败动作，会关闭加载动画框，并且提示错误信息
                    } else {
                        dispatch(reciveError(''))//发出请求失败动作，会关闭加载动画框，不会提示错误信息
                    }
                    if (failedCallback) {//如果失败回调存在，把错误信息传回去
                        failedCallback(errorMessage)
                    }
                })
            } else if (resStatus === 503) {
                res.json().then(jsonResult => {
                    // let errorCode=jsonResult.errorCode
                    let errorMessage = jsonResult.errorMessage
                    if (isAlertError) {//如果需要提示错误信息
                        dispatch(reciveError(errorMessage))//发出请求失败动作，会关闭加载动画框，并且提示错误信息
                    } else {
                        dispatch(reciveError(''))//发出请求失败动作，会关闭加载动画框，不会提示错误信息
                    }
                    if (failedCallback) {//如果失败回调存在，把错误信息传回去
                        failedCallback(errorMessage)
                    }
                })
            }else if (resStatus === 404) {
                let errorMessage = "连接不到服务器，请检查网络"
                    dispatch(reciveError(errorMessage))//发出请求失败动作，会关闭加载动画框，并且提示错误信息
                if (failedCallback) {//如果失败回调存在，把错误信息传回去
                    failedCallback(errorMessage)
                }
            }else{
                let error = new Error(res.statusText)
                error.response = res
                throw error
            }

        })

            // .then(json=>{console.log("jsonjson===="+JSON.stringify(json))})
            .catch(error => {
                // console.log("error====" + error)
                if (isAlertError) {//如果需要提示错误信息
                    dispatch(reciveError(error))//发出请求失败动作，会关闭加载动画框，并且提示错误信息
                } else {
                    dispatch(reciveError(''))//发出请求失败动作，会关闭加载动画框，不会提示错误信息
                }
                if (failedCallback) {//如果失败回调存在，把错误信息传回去
                    failedCallback(error.toString())
                }
            })
    }
}