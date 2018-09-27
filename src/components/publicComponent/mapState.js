export default (state) => {
  let { filterReducers } = state
  return ({
    filter: filterReducers.filter,
    ArrayDate: state.fILETReducer.arr,
    //Fileds: state.SAVETableReducer.TableData
  })
}