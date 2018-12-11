import React,{Fragment, Component} from 'react';
import mapStateToProps from './mapState'
import mapDispatchToProps from './mapDispatch'
import { connect } from 'react-redux'
import queryString from 'query-string'
import Filter from './filter'
import Table from './table'
import data from 'utils/datas.js'
import WeekTable from './weekTable'
import { CalcDiffTime } from 'utils'
import { type } from 'os';

class PublicComponent extends Component {
    constructor(){
        super()
        this.state = {
            dateFormat:'',
            filed:null
        }
        this.onFilterSubmit = this.onFilterSubmit.bind(this)
    }
    
    componentDidMount(){
        let { pathname } = location
        let pubChildren = pathname.split('/')[2]
        let { setSearch } = this.props
        let filed = queryString.parse(location.search)
        // console.log(filed);
        data[pubChildren] && setSearch(data[pubChildren].search)
        // location.search && this.onFilterSubmit({filed})
    }

    onFilterSubmit = ({filed, dateFormat,offset}) => {
        // console.log(filed)
        let { queryList } = this.props
        let { pathname } = location
        let newFiled = {}
        let time = ''
        let pubChildren = pathname.split('/')[2]
        // console.log(filed.start_date)
        let calcDiffTime = filed.start_date && filed.end_date && CalcDiffTime(filed.start_date.format(dateFormat),filed.end_date.format(dateFormat), dateFormat)
        for(let item in filed){
            if(filed[item] != undefined && filed[item] != ''){
                newFiled[item] = filed[item]
            }
        }
        console.log(newFiled)
        // console.log(dateFormat)
        if (data[pubChildren].reportName=='effectiveSales' || data[pubChildren].reportName=='scaleSequence'  || data[pubChildren].reportName=='branchBalanceStatistics' || data[pubChildren].reportName=='AutonomicBalance' || data[pubChildren].reportName=='productRevenueStatistics' || data[pubChildren].reportName=='branchRevenueStatistics') {
            dateFormat = 'YYYY-MM'
        }

        if (data[pubChildren].reportName=='distributionOfProvision') {
            dateFormat = 'YYYY'
        }

        this.setState({
            dateFormat,
            filed,
        })
        for (let item in filed) {
            if(filed[item] instanceof Object && filed[item]){
                // console.log(filed[item])
                newFiled[item] = filed[item].format(dateFormat === 'YYYY-MM-DD' ? 'YYYYMMDD' : 'YYYYMM')
            }
        }
        switch(dateFormat){
            case 'YYYY':
                time = 'yearly'
                break
            case 'YYYY':
                time = 'quarterly'
                break
            case 'YYYY-MM':
                time = 'monthly'
                break
            case 'YYYY-MM-DD':
                time = 'daily'
                break
        }
        if(data[pubChildren].reportName==='weeklyDataQuery'){
            time = 'weekly';
            let dateStr = filed.update_date.format('YYYY-MM-DD');
            let oDate = new Date(dateStr);
            let week = oDate.getDay();
            if(week === 0){
                newFiled.update_date = filed.update_date.format('YYYYMMDD');
                // console.log(newFiled.update_date)
            }else{
                let num = (7 - week)*24*60*60*1000;
                let cDate = new Date(new Date(dateStr).getTime()+num);
                let y = cDate.getFullYear() + '';
                let m = cDate.getMonth()+1 + '';
                let d = cDate.getDate() + '';
                newFiled.update_date = y+m+d; 
            }
        }
        

        let datas = {
            reportName:data[pubChildren].reportName,
            // organCode:filed.organCode,
            // organ_level:filed.organ_level,
            offset:offset ? offset.offset : 1,
            time,
            limit:10,
            paramMap:{
                // ...filed,
                ...newFiled,
            },
        };
        // console.log(filed);
        if(data[pubChildren].reportName!=='branchBalanceStatistics' && data[pubChildren].reportName!=='productInformation' && data[pubChildren].reportName!=='closedSale' && data[pubChildren].reportName!=='openCostStatistics' && data[pubChildren].reportName!=='AutonomicBalance' && data[pubChildren].reportName!=='distributionOfProvision' && data[pubChildren].reportName !== 'failureAmountDetails' && data[pubChildren].reportName!=='weeklyDataQuery'){
            datas.paramMap.day_interval = calcDiffTime || ''
        }

        if(data[pubChildren].orcode){
            let locationSearch = queryString.parse(location.search)
            datas.paramMap.organ_code = locationSearch.organ_code;
        }

        if(data[pubChildren].group_by){
            datas.paramMap.group_by = data[pubChildren].group_by
        }

        /* if(data[pubChildren].reportName=='effectiveSales' || data[pubChildren].reportName=='sequenceOfSales' || data[pubChildren].reportName=='openSales' || data[pubChildren].reportName=='openSalesSeries' || data[pubChildren].reportName=='branchSalesStatistics' || data[pubChildren].reportName=='productSalesStatistics' || data[pubChildren].reportName=='productBalanceSequence' || data[pubChildren].reportName=='branchHoldings' || data[pubChildren].reportName=='productQuantity' || data[pubChildren].reportName=='productRevenueStatistics' || data[pubChildren].reportName=='branchRevenueStatistics' || data[pubChildren].reportName=='distributionOfProvision' || data[pubChildren].reportName=='branchComprehensiveStatistics' || data[pubChildren].reportName=='comprehensiveProductStatistics'){
            datas.paramMap.organCode = filed.organCode;
            datas.paramMap.organ_level = filed.organ_level
        } */

        console.log(datas)
        queryList(datas);
    }

    render(){
        const { filter, getAuthority, setFilter, setSearch } = this.props
        let { filed, dateFormat } = this.state
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
            reportName:data[pubChildren] && data[pubChildren].reportName,
            onFilterSubmit:offset => this.onFilterSubmit({offset, filed, dateFormat})
        }
        return(
            <Fragment>
                { filter && filter.length > 0 && <Filter {...filterProps} />  }
                { data[pubChildren] && data[pubChildren].tableType === 'weekTable' && <WeekTable  {...listProps}/>}
                { data[pubChildren] && !data[pubChildren].tableType && <Table {...listProps} /> }
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicComponent)
