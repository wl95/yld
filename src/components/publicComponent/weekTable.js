import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { filterAPI } from 'utils';
import './table.less'
import Select from 'rc-select';
import { connect } from 'react-redux';
import mapDispatchToProps from './mapDispatch';
import mapStateToProps from './mapState'
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1, //当前页码
      pageSize: 10, //每页显示的条数
    }
  }

  componentDidMount() {
    
  }

  onChange = (page) => {
    // console.log(page)
    this.setState({
      current: page,
    });
  }

  render() {
    let { title = '', tableResult, scroll, list, total, totalPage } = this.props;
    let { table1, table2, table3, table4, table5 } = list
    let { current, pageSize } = this.state
    let { columnsTable1, columnsTable2, columnsTable3, columnsTable4, columnsTable5 } = tableResult;
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

    return table1 ? <div className="table" style={{ overflowX: scroll && scroll.x && 'scroll' }}>
      <h5>{title}</h5>
      <p>表1</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable1 && thThead(columnsTable1)}
        </thead>
        <tbody>
            {/* <tr>
              {
                Object.keys(TABLE1).map(function (key,_index) {
                  return <td key={_index}>{TABLE1[key]}</td>
                })
              }
            </tr> */}
            <tr>
              <td>{table1.L_WEEK_AMT}</td>
              <td>{table1.WEEK_AMT}</td>
              <td>{table1.MONTH_AMT}</td>
              <td>{table1.YEAR_AMT}</td>
              <td>{table1.WEEK_END_HOLD_AMT}</td>
              <td>{table1.L_WEEK_END_HOLD_AMT}</td>
              <td>{table1.L_MONTH_END_HOLD_AMT}</td>
              <td>{table1.L_YEAR_END_HOLD_AMT}</td>
            </tr>
        </tbody>
      </table>
      <p>表2</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable2 && thThead(columnsTable2)}
        </thead>
        <tbody>
           {/* <tr>
              {
                Object.keys(table2).map(function (key,_index) {
                  return <td key={_index}>{table2[key]}</td>
                })
              }
            </tr> */}
          <tr>
            <td>{table2.TIME_INTERVAL}</td>
            <td>{table2.PLAN_SALE_BALACE_AMT}</td>
            <td>{table2.WEEK_INCREASE_AMT}</td>
          </tr>
        </tbody>
      </table>
      <p>表3</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable3 && thThead(columnsTable3)}
        </thead>
        <tbody>
            {/* <tr>
              {
                Object.keys(table3).map(function (key,_index) {
                  return <td key={_index}>{table3[key]}</td>
                })
              }
            </tr> */}
          <tr>
            <td>{table3.TIME_INTERVAL}</td>
            <td>{table3.PROD_FOUNT_NUM}</td>
            <td>{table3.PLAN_RAISING_BALANCE_AMT}</td>
            <td>{table3.ACTUAL_RAISING_BALANCE_AMT}</td>
            <td>{table3.SALES_RATE}</td>
            <td>{table3.RAISING_PROD_AMT}</td>
          </tr>
        </tbody>
      </table>
      <p>表4</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable4 && thThead(columnsTable4)}
        </thead>
        <tbody>
          {
            (table4 && table4.length>0) ? table4.map((dataItem, _ind) => {
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
      <p>表5</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable5 && thThead(columnsTable5)}
        </thead>
        <tbody>
            {/* <tr>
              {
                Object.keys(table5).map(function (key,_index) {
                  return <td key={_index}>{table5[key]}</td>
                })
              }
            </tr> */}
          <tr>
            <td>{table5.TIME_INTERVAL}</td>
            <td>{table5.PLAN_SALES_PERSONAL_BALANCE_AMT}</td>
            <td>{table5.MATURITY_PERSONAL_BALANCE_AMT}</td>
          </tr>
        </tbody>
      </table>
      {
        //list && list.length>0 && <Pagination style={{textAlign:'center', margin:'10px 0', display:'inline-block'}} {...PaginationProps}/> 
      }
    </div> : '暂无数据'
  }
}
Table.propTypes = {
 
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)