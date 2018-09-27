import 'babel-polyfill'
import React,{Fragment}from 'react'
import {render} from 'react-dom'
import Root from './Root'
import configureStore from './configureStore'
import './themes/index.less';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
const store = configureStore()//初始化redux的store
/***
 * app入口
 */
// console.log(location)
render(
   <Fragment>
       <Root store={store}/>
       <ToastContainer/>
    </Fragment>,
    document.getElementById('root')
)