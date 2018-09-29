import { setFilterData,setDATE, setSearchData, queryListData, getAuthorityData, disableSelect} from 'actions/filterAction'
export default (dispatch) => ({
    setFilter: (filterData, index) => dispatch(setFilterData(filterData, index)),
    setSearch: (searchData) => dispatch(setSearchData(searchData)),
    queryList: (queryData) => dispatch(queryListData(queryData)),
    SUPDATE_DATE_END: (data) => dispatch(setDATE(data)),
    getAuthority:(juris) => getAuthorityData(dispatch, juris),
    setDisable:(organLevel) => dispatch(disableSelect(organLevel)),
})