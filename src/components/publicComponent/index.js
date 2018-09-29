import React,{Fragment,Component} from 'react';
import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import { connect } from 'react-redux'
import Filter from './filter'
import Table from './table'
import data from 'utils/datas.js'
import moment from "moment"
import axios from 'axios';
import mock from '../../actions/mock'
import queryString from 'query-string'
import Month from '../Calendar/Month.jsx'
import { request } from 'utils'
const PublicComponent = ({
    setSearch,
    queryList,
}) => {
    let { pathname } = location
    let pubChildren = pathname.split('/')[2]
    const filterProps = {   
        location,
        onFilterSubmit({filed, dateFormat}){
            for (let item in filed) {
                if(filed[item] instanceof Object){
                   
                    filed[item] = filed[item].format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM')
                }
            }
            console.log(filed)
        }
    }
    setSearch(data[pubChildren] && data[pubChildren].search)
    const listProps = {
        tableResult:data[pubChildren] && data[pubChildren].tableResult,
        title:data[pubChildren] && data[pubChildren].title,
    }
    return  <Fragment>
                <Filter {...filterProps} /> 
                <Table {...listProps} />
            </Fragment>
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicComponent)