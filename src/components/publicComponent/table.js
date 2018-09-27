import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { filterAPI } from 'utils';
import './table.less'
import { connect } from 'react-redux';
import mapDispatchToProps from './mapDispatch';
import mapStateToProps from './mapState'
import PageComponent from './page.js';
import moment from "moment"
import axios from 'axios';
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indexList: [], //获取数据的存放数组
      totalNum: '',//总记录数
      totalData: {},
      current: 1, //当前页码
      pageSize: 10, //每页显示的条数5条
      goValue: '',
      totalPage: '',//总页数 
    }
  }
  componentDidMount() {
    // let { SUPDATE_DATE_END} = this.props
    // SUPDATE_DATE_END([])

  }

  // SendData(datas) {
  //   console.log(datas)
   
  // }
  //   componentWillMount(){
  //     var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
  //    //使用mock模拟数据
  //    $.ajax({
  //        url:MockApi.getIndexList()+/\/\.json/,
  //        dataType:'json',
  //    }).done(function(data){
  //        _this.setState({totalData:data})
  //        _this.setState({totalNum:data.array.length})
  //        //计算总页数= 总记录数 / 每页显示的条数
  //        let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
  //        _this.setState({totalPage:totalPage})
  //        _this.pageClick(1);
  //    })

  // }
  //点击翻页
  pageClick(pageNum) {
    let _this = this;
    if (pageNum != _this.state.current) {
      _this.state.current = pageNum
    }
    _this.state.indexList = [];//清空之前的数据
    for (var i = (pageNum - 1) * _this.state.pageSize; i < _this.state.pageSize * pageNum; i++) {
      console.log(_this.state.totalData)
      if (_this.state.totalData) {
        _this.state.indexList.push(_this.state.totalData)
      }
    }
    _this.setState({ indexList: _this.state.indexList })
    //console.log(_this.state.indexList)
  }
  //上一步
  goPrevClick() {
    var _this = this;
    let cur = this.state.current;
    if (cur > 1) {
      _this.pageClick(cur - 1);
    }
  }
  //下一步
  goNext() {
    var _this = this;
    let cur = _this.state.current;
    //alert(cur+"==="+_this.state.totalPage)
    if (cur < _this.state.totalPage) {
      _this.pageClick(cur + 1);
    }
  }
  //跳转到指定页
  goSwitchChange(e) {
    var _this = this;
    _this.setState({ goValue: e.target.value })
    var value = e.target.value;
    //alert(value+"==="+_this.state.totalPage)
    if (!/^[1-9]\d*$/.test(value)) {
      console.log('页码只能输入大于1的正整数');
    } else if (parseInt(value) > parseInt(_this.state.totalPage)) {
      console.log('没有这么多页');
    } else {
      _this.pageClick(value);
    }
  }
  /**
   * 间隔天数
  */
  Times(faultDate, completeTime) {
    let stime = Date.parse(new Date(faultDate));
    let etime = Date.parse(new Date(completeTime));
    let usedTime = etime - stime;  //两个时间戳相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    let leave1 = usedTime % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));
    let time = days + 1;

    return time;
  }
  /**
   * 间隔月数
   */
  getIntervalMonth(date1, date2) {
    date1 = date1.split("-");
    date2 = date2.split("-");
    //获取年,月数
    var year1 = parseInt(date1[0]),
      month1 = parseInt(date1[1]),
      year2 = parseInt(date2[0]),
      month2 = parseInt(date2[1]),
      //通过年,月差计算月份差
      months = (year2 - year1) * 12 + (month2 - month1) + 1;
    return months;
  }
  render() {
    let { title = '', tableResult, scroll, ArrayDate, Fileds } = this.props;
    let { columns } = tableResult;
    const thThead = (columns) => {
      return columns && columns.length > 0 && columns[0].children ?
        <Fragment>
          <tr>
            {
              columns && columns.map((item, index) => {
                return <th key={index} colSpan={item.children && item.children.length}>
                  {item.title}
                </th>
              })
            }
          </tr>
          <tr>
            {
              columns.map(item => {
                return item.children.map((childrenItem, index) => {
                  return <th key={index} colSpan={childrenItem.children && childrenItem.children.length}>
                    {childrenItem.title}
                  </th>
                })
              })
            }
          </tr>
        </Fragment>
        : <tr>
          {
            columns && columns.map((item, index) => {
              return <th key={index} colSpan={item.children && item.children.length}>
                {item.title}
              </th>
            })
          }
        </tr>
    }

    return <div className="table" style={{ overflowX: scroll && scroll.x && 'scroll' }}>
      <h5>{title}</h5>
      <p></p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columns && thThead(columns)}
        </thead>
        <tbody>
          {
            ArrayDate.length>0? ArrayDate && ArrayDate.map((dataItem, _ind) => {
                return <tr key={_ind}>
                  {
                    Object.keys(dataItem).map(function (key,_index) {
                      return <td key={_index}>{dataItem[key]}</td>
                    })
                  }
                </tr>
              }):<tr><td  colSpan="24" style={{"border":"none","textAlign":"center","overflow":"hidden"}}>暂无数据,请重新筛选！😝</td></tr>
          }
        </tbody>
      </table>
      <PageComponent
        total={this.state.totalNum}
        current={this.state.current}
        totalPage={this.state.totalPage}
        goValue={this.state.goValue}
        pageClick={this.pageClick.bind(this)}
        goPrev={this.goPrevClick.bind(this)}
        goNext={this.goNext.bind(this)}
        switchChange={this.goSwitchChange.bind(this)} /> 
    </div>
  }
}
Table.propTypes = {
  // ArrayDate: PropTypes.array.isRequired
}
// function mapStateToProps(state) {
//   console.log(state.SAVETableReducer.TableData)
//   return {
//     
//   }
// }

// function mapDispatchToProps() {
//   return {}
// }
export default connect(mapStateToProps, mapDispatchToProps)(Table)