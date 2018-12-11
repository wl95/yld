import { setFilterData, setSearchData, queryListData, getAuthorityData } from 'actions/filterAction'
export default (dispatch) => ({
    setFilter: (filterData, index) => dispatch(setFilterData(filterData, index)),
    setSearch: (searchData) => dispatch(setSearchData(searchData)),
    queryList: (queryData) => dispatch(queryListData(queryData)),
    getAuthority:(juris) => getAuthorityData(dispatch, juris),
})