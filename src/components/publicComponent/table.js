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
    const { onFilterSubmit } = this.props
    this.setState({
      current: page,
    });
    onFilterSubmit({ offset: page })
  }

  render() {
    let { title = '', tableResult, scroll, list, total, reportName } = this.props;
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
      current, //页码
      total,
      onChange: this.onChange,
      selectComponentClass: Select,
      showSizeChanger: true,
      showQuickJumper: { goButton: <button>确定</button> },
      defaultPageSize: pageSize,
      showTotal: (total) => `共 ${total} 条`,
      defaultCurrent: current,
      pageSizeOptions: ['10', '30', '50', '100', '500']
    }

    function sortBy(filed){
      return function (a,b){
        return a[filed] - b[filed];
      }
    }

    const getLists = (columns) => {
      reportName === "closedStatistics" && list.sort(sortBy('DAYS_GROUP'));
      return list.map((listItem, listIndex) => {
        console.log(listItem);
        return <tr key={listIndex}>
        {
          reportName === 'productInformation' && <td>{listIndex+1}</td>
        } 
        {
          columns.map((item, index) => {
            {
              // console.log(listItem);
              return item.children ?
                item.children && item.children.map((items, _index) => {
                  return <td key={items.dataIndex}>{
                    listItem['UPDATE_DATE'] || listItem['AREA_CODE' ] || listItem['PERSON_RANK'] || listItem['RANK'] || listItem['TRADE_AMT'] ? Number(listItem[items.dataIndex]).toFixed(2) : listItem[items.dataIndex]
                  }</td>
                }) :
              <td key={index}>{listItem['UPDATE_DATE'] || listItem['AREA_CODE' ] || listItem['PERSON_RANK'] || listItem['RANK'] || listItem['TRADE_AMT'] || listItem['PROD_ID'] ? Number(listItem[item.dataIndex]).toFixed(2) : listItem[item.dataIndex]}</td>
            }
          })}
        </tr>
      })
    }


    return <div className="table" style={{ overflowX: scroll && scroll.x && 'scroll' }}>
      <h5>{title}</h5>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columns && thThead(columns)}
        </thead>
        <tbody>
          {
            (list && list.length > 0) ? getLists(columns) : <tr><td colSpan="48" style={{ "border": "none", "textAlign": "center", "overflow": "hidden" }}>暂无数据,请重新筛选！😝</td></tr>
          }
        </tbody>
      </table>
      {
        list && list.length > 0 && <Pagination style={{ textAlign: 'center', margin: '10px 0', display: 'inline-block' }} {...PaginationProps} />
      }
    </div>
  }
}
Table.propTypes = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Table)








/* 
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
    const { onFilterSubmit } = this.props
    this.setState({
      current: page,
    });
    onFilterSubmit({ offset: page })
  }

  render() {
    let { title = '', tableResult, scroll, list, total, reportName } = this.props;
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
      onChange: this.onChange,
      selectComponentClass: Select,
      showSizeChanger: true,
      showQuickJumper: { goButton: <button>确定</button> },
      defaultPageSize: pageSize,
      showTotal: (total) => `共 ${total} 条`,
      defaultCurrent: current,
      pageSizeOptions: ['10', '30', '50', '100', '500']
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
            (list && list.length > 0) ? list.map((dataItem, _ind) => {
              return <tr key={_ind}>
                {(reportName == 'closedStatistics' || reportName == 'productInformation') ? <td>{(current - 1 ) * 10 + _ind + 1}</td> : ''}
                {
                  Object.keys(dataItem).map(function (key, _index) {
                    return <td key={_index}>{dataItem[key]}</td>
                  })
                }
              </tr>
            }) : <tr className="trs"><td colSpan="48" style={{ "border": "none", "textAlign": "center", "overflow": "hidden" }}>暂无数据,请重新筛选！😝</td></tr>
          }
        </tbody>
      </table>
      {
        list && list.length > 0 && <Pagination style={{ textAlign: 'center', margin: '10px 0', display: 'inline-block' }} {...PaginationProps} />
      }
    </div>
  }
}
Table.propTypes = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Table) */