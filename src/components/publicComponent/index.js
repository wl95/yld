import React,{Fragment, Component} from 'react';
import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import { connect } from 'react-redux'
import queryString from 'query-string'
import Filter from './filter'
import Table from './table'
import data from 'utils/datas.js'
import WeekTable from './weekTable'
import { CalcDiffTime, calcReportName } from 'utils'

class PublicComponent extends Component {
    constructor(){
        super()
        this.state = {
            dateFormat:''
        }
        this.onFilterSubmit = this.onFilterSubmit.bind(this)
    }
    
    componentDidMount(){
        let { pathname } = location
        let pubChildren = pathname.split('/')[2]
        let { setSearch } = this.props
        let filed = queryString.parse(location.search)
        data[pubChildren] && setSearch(data[pubChildren].search)
        //location.search && this.onFilterSubmit({filed})
    }

    onFilterSubmit({filed, dateFormat,offset}){
        let { queryList } = this.props
        let { pathname } = location
        let pubChildren = pathname.split('/')[2]
        let {DATE_TYPE,UPDATE_DATE_START,UPDATE_DATE_END,ORGAN_LEVEL} =filed;
        let calcDiffTime = CalcDiffTime(UPDATE_DATE_START.format(dateFormat),UPDATE_DATE_END.format(dateFormat), dateFormat)
       /*  for (let item in filed) {
            if(filed[item] instanceof Object){
                filed[item] = filed[item].format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM')
            }
        } */
        
        let datas = {
            reportName:calcReportName(UPDATE_DATE_START.format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM'), UPDATE_DATE_END.format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM'), ORGAN_LEVEL, data[pubChildren].reportName),
            offset:offset || 1,
            limit:10,
            paramMap:{
                DATE_TYPE,
                GROUP_BY:"ORGAN_ID",
                UPDATE_DATE_START:UPDATE_DATE_START.format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM'),
                UPDATE_DATE_END:UPDATE_DATE_END.format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM'),
                ORGAN_LEVEL,
                DAY_INTERVAL:calcDiffTime
            },
            orderMap:{property:"period",direction:"DESC"}
        };
        // console.log(datas)
        /* location.search =  queryString.stringify({
            DATE_TYPE,
            GROUP_BY:"ORGAN_ID",
            UPDATE_DATE_START:UPDATE_DATE_START,
            UPDATE_DATE_END:UPDATE_DATE_END,
            ORGAN_LEVEL:ORGAN_LEVEL,
            DAY_INTERVAL:CalcDiffTime(UPDATE_DATE_START,UPDATE_DATE_END, dateFormat)
        })  */
        queryList(datas)
        this.setState({
            dateFormat
        })
    }

    render(){
        const { filter, getAuthority, setFilter, setSearch } = this.props
        let { pathname } = location
        let pubChildren = pathname.split('/')[2]
        const filterProps = {   
            location,
            filter,
            getAuthority,
            setFilter,
            setSearch,
            onFilterSubmit:this.onFilterSubmit
        }

        const listProps = {
            tableResult:data[pubChildren] && data[pubChildren].tableResult,
            title:data[pubChildren] && data[pubChildren].title,
            onFilterSubmit:this.onFilterSubmit
        }

        return(
            <Fragment>
                { filter && filter.length > 0 && <Filter {...filterProps} />  }
                { data[pubChildren].tableType === 'weekTable' && <WeekTable  {...listProps}/>}
                { !data[pubChildren].tableType && <Table {...listProps} /> }
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicComponent)