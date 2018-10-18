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
        // location.search && this.onFilterSubmit({filed})
    }

    onFilterSubmit ({filed, dateFormat,offset}) {
        let { queryList } = this.props
        let { pathname } = location
        let newFiled = {}
        let time = ''
        let pubChildren = pathname.split('/')[2]
        let calcDiffTime = filed.UPDATE_DATE_START && CalcDiffTime(filed.UPDATE_DATE_START.format(dateFormat),filed.UPDATE_DATE_END.format(dateFormat), dateFormat)
        for (let item in filed) {
            if(filed[item] instanceof Object && filed[item]){
              newFiled[item] = filed[item] && filed[item].format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM')
            }
        }
        switch(dateFormat){
            case 'YYYY':
                time = 'yearily'
                break
           /*  case 'YYYY':
                time = 'qusrterily' */
                break
            case 'YYYY-MM':
                time = 'monthily'
                break
            case 'YYYY-MM-DD':
                time = 'daily'
                break
        }
        let datas = {
            reportName:data[pubChildren].reportName,
            organCode:filed.organCode,
            time,
            offset:offset || 1,
            limit:10,
            paramMap:{
                ...filed,
                ...newFiled,
                GROUP_BY:"ORGAN_ID",
                DAY_INTERVAL:calcDiffTime || '',
            },
            orderMap:{property:"period",direction:"DESC"}
        };
        
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