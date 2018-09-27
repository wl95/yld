import { setFilterData,setDATE, setSearchData, queryListData} from 'actions/filterAction'
export default (dispatch) => ({
    setFilter: (filterData, index) => dispatch(setFilterData(filterData, index)),
    setSearch: (searchData) => dispatch(setSearchData(searchData)),
    queryList: (queryData) => dispatch(queryListData(queryData)),
    SUPDATE_DATE_END: (data) => dispatch(setDATE(data)),
})