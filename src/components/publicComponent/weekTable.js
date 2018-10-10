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
      pageSize: 10, //每页显示的条数5条
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
    let { current, pageSize } = this.state
    let { columnsTable1, columnsTable2, columnsTable3, columnsTable4 } = tableResult;
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
      <p>表1</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable1 && thThead(columnsTable1)}
        </thead>
        <tbody>
            <tr>
              {/* <td>213</td>
              <td>213</td>
              <td>213</td>
              <td>213</td>
              <td>213</td>
              <td>213</td>
              <td>213</td>
              <td>213</td> */}
            </tr>
        </tbody>
      </table>
      <p>表2</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable2 && thThead(columnsTable2)}
        </thead>
        <tbody>
          <tr>
            <td>5454213354</td>
            <td>10</td>
            <td>-4883</td>
          </tr>
        </tbody>
      </table>
      <p>表3</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable3 && thThead(columnsTable3)}
        </thead>
        <tbody>
          <tr>
            <td>112</td>
            <td>435</td>
            <td>5221</td>
            <td>321</td>
            <td>0.42</td>
            <td>456</td>
          </tr>
        </tbody>
      </table>
      <p>表4</p>
      <table border="1" width={scroll && scroll.x}>
        <thead>
          {columnsTable4 && thThead(columnsTable4)}
        </thead>
        <tbody>
          <tr>
            <td>465456</td>
            <td>45464</td>
            <td>123</td>
            <td>120.456</td>
            <td>56456</td>
            <td>45678</td>
          </tr>
        </tbody>
      </table>
      {
        //list && list.length>0 && <Pagination style={{textAlign:'center', margin:'10px 0', display:'inline-block'}} {...PaginationProps}/> 
      }
    </div>
  }
}
Table.propTypes = {
 
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)