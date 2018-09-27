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
  componentDidMount(){
    let herfStr = location.href;
    let index = herfStr.indexOf('?');
    herfStr = herfStr.slice(index+1);
    if(herfStr.indexOf('organcode')!==-1 && herfStr.indexOf('organlevel') !== -1){
      // 参数正确得传入
      herfStr.split('&').map(item=>{//把获取参数存入本地存储
        return item.split('=')
      }).forEach(item=>{
        localStorage.setItem(item[0],item[1]);
      })
    }else{
      //参数未正确传入
    }
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