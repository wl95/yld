export default (state) => {
  let { filterReducers } = state
  return ({ 
    filter: filterReducers.filter,
    list: filterReducers.list,
    total: filterReducers.total,
    totalPage: filterReducers.totalPage,
  })
}