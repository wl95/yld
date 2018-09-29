import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { filterAPI } from 'utils';
import './table.less'
import Select from 'rc-select';
import { connect } from 'react-redux';
import mapDispatchToProps from './mapDispatch';
import mapStateToProps from './mapState'
import Pagination from 'rc-pagination';
import moment from "moment"
import axios from 'axios';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, //当前页码
      pageSize: 10, //每页显示的条数5条
    }
  }
  componentDidMount() {
    
  }

  onChange = (page) => {
    console.log(page)
    this.setState({
      current: page,
    });
  }

  render() {
    let { title = '', tableResult, scroll, list, total, totalPage } = this.props;
    let { current, pageSize } = this.state
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

    let PaginationProps = {
      current,
      total,
      onChange:this.onChange,
      selectComponentClass:Select,
      showSizeChanger:true,
      showQuickJumper:{ goButton: <button>确定</button> },
      defaultPageSize:pageSize,
      showTotal:(total) => `共 ${total} 条`,
      defaultCurrent:current,
      pageSizeOptions:['10', '30', '50', '100', '500']
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
            (list && list.length>0) ?  list.map((dataItem, _ind) => {
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
      {
        list && list.length>0 && <Pagination style={{textAlign:'center', margin:'10px 0', display:'inline-block'}} {...PaginationProps}/> 
      }
    </div>
  }
}
Table.propTypes = {
 
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)