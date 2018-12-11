import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './bootstrapsPage.less'
import { connect } from 'react-redux'
import { clearFilter } from 'actions/filterAction'
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
  
  onNavLink = () => {
    let { clearFilter } = this.props
    clearFilter()
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
                          return  <NavLink onClick={this.onNavLink} to={`${organCode}${item.path}?organCode=11005293&&organLevel=0`} key={index}>{item.title}</NavLink>
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

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearFilter:() => dispatch(clearFilter()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BootstrapsPage)