import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './bootstrapsPage.less'
import routeConfig from 'components/routeConfig'
let organCode = '/Home';
class BootstrapsPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      isShow:1
    }
  }
  onManagemoney = (value) => {
    this.setState({
      isShow:value
    })
  }
  render(){
    let {isShow} = this.state;
    return  <div className="first">
              <h6>欢迎进入报表管理平台</h6>
              <div className="left">
                <span className={isShow == 1 ? ' bg' : '' } onClick={e=>this.onManagemoney(1)}>理财报表</span>
                <span className={isShow == 2 ? ' bg' : '' } onClick={e=>this.onManagemoney(2)}>基金报表</span>
              </div>
              <div className="right">
                <div className={`managemoney${isShow == 1 ? ' disblock' : ''}`}>
                  {
                      routeConfig && routeConfig.routers.map((item,index) => {
                          return  <NavLink to={`${organCode}${item.path}`} key={index}>{item.title}</NavLink>
                      })
                  }
                </div>
                <div className={`managemoney${isShow == 2 ? ' disblock' : ''}`}>
                  欢迎进入基金报表管理平台
                </div>
              </div>
            </div>
  }
}
export default BootstrapsPage