import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchDataCallback} from "../../actions/commonActions"
import {FETCH_URL_LOGIN} from "../../utils/constant"
import { Form, Col, FormControl, Button, FormGroup } from 'react-bootstrap'
import styles from './login.less'

/**
 * 登录容器
 */
class LoginBootStrap extends Component {
    constructor(props) {
        super(props)
        //初始化表单数据
        this.state = {
            loginError:'',
            form: {login_user: {valid:false,invalid:false,value:'',error:''},
                Login_password: {valid:false,invalid:false,value:'',error:''}
            }
        }
    }

    /***
     * 监听输入框输入并修改state
     * @param event
     */
    handleInputChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        // console.log(target.name+":"+target.value)

        const {form} = this.state
        this.setState({
            form: {
                ...form,
                [name]: {...form[name],value:value}
            }
        })
    }

    /***
     * 监听输入框失去焦点事件，并校验数据，修改state
     * @param event
     */
    handleInputBlur = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        // console.log(target.name + ":" + target.value)

        const [valid,invalid,error] = this.checkData(name,value)

        const {form} = this.state
        this.setState({
            form: {
                ...form,
                [name]: {...form[name],valid:valid,invalid:invalid,error:error}
            }
        })
    }

    /***
     * 校验数据
     * @param name
     * @param value
     * @returns {*[]}
     */
    checkData=(name,value)=>{
        let valid=true
        let invalid=false
        let error=''
        switch (name){
            case 'login_user':
                if(value.length===0){
                    valid=false
                    invalid=true
                    error='请输入用户名'
                }
                break
            case 'login_password':
                if(value.length===0){
                    valid=false
                    invalid=true
                    error='请输入密码'
                }
                break
            default :
                break
        }

        return [valid,invalid,error]
    }

    /***
     * 阻止默认的表单提交事件
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault()
    }

    /***
     * 登录
     */
    onLogin = () => {
        //清空登录错误报文，使错误alert消失
        this.setState({loginError:''})

        //判断是否可以提交
        const {form: {login_user, login_password}} = this.state;
        if (!login_user.valid || !login_password.valid) {
            return;
        }

        //构造请求参数
        const {form} = this.state
        // let params={userName:`${form.login_user.value}`,password:`${form.login_password.value}`}
        // let params={beginDate:'20180501',endDate:'20180508',dateType:'1',dataGranularity:'1'}
        let params={}
        //请求登录
        this.props.fetchDataCallback(FETCH_URL_LOGIN,
            'GET',
            params,
            (json) => {this.props.history.push(`${this.props.match.url.replace('loginbootstrap','')}main`)},
            // (error) => {this.setState({loginError:error})},
            (error) => {console.log("tiaozhuan"); this.props.history.push(`${this.props.match.url.replace('loginbootstrap','')}main`)},
            true,
            false)//请求数据
    }


    render() {

        console.log("render**************LoginBootstrap")

        const {loginError,form} = this.state


        return (
            <Form inline className='login'>
                <FormGroup  controlId="formHorizontalEmail"  style={{width:'100%',lineHeight:'38px'}}>
                    <Col sm={4} lg={4} xs={4} className="login-label">
                    <span style={{color:'red'}}>*</span>
                    用户名：
                    </Col>
                    <Col sm={8} lg={8} xs={8} className="login-input"> 
                    <FormControl type="text" placeholder="请输入用户名" 
                        name="login_user"
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                    />
                    </Col>
                </FormGroup>
                <span style={{width:'100%',textAlign:'center',color:'red'}}>{form.login_user.help}</span>
                <FormGroup controlId="formHorizontalPassword" style={{width:'100%',lineHeight:'38px'}}>
                    <Col sm={4} lg={4} xs={4} className="login-label">
                    <span style={{color:'red'}}>*</span>
                    密码：
                    </Col>
                    <Col sm={8} lg={8} xs={8} className="login-input">
                    <FormControl type="password" placeholder="请输入密码" 
                        name="login_password"
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                    />
                    </Col>
                </FormGroup>
                <span style={{width:'100%',textAlign:'center',color:'red'}}>{form.login_password.help}</span>
                <FormGroup style={{width:'100%', justifyContent:'center'}}>
                    <Button bsStyle="primary"  onClick={this.onLogin} className="submit">登录</Button>
                </FormGroup>
                </Form>
        )
    }
}


LoginBootStrap.propTypes = {
    userInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    userInfo: state.userInfoReducer.userInfo
})


const mapDispatchToProps = (dispatch) => ({
    fetchDataCallback: (fetchUrl,reqType,params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError) => dispatch(fetchDataCallback(fetchUrl,reqType,params, successCallback, failedCallback, isOpenLoadingDialog, isAlertError))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBootStrap)