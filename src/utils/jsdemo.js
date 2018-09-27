
//遍历追加list
// let plist = [{pcode: "1", pname: "a", clist: [{ccode: "0", cname: "all"}]},
//     {pcode: "2", pname: "b", clist: []}]
// let clists = [{ccode: "3", cname: "c"}, {ccode: "4", cname: "d"}]
//
// plist=plist.map((item)=>{
//     if(item.pcode==="1"){
//         return {...item,clist:[...item.clist,...clists]}
//     }else{
//         return item
//     }
// })

//路由跳转
// this.props.history.push(`${this.props.match.path.replace('login','')}bootstrap`)
// this.props.history.replace(`${this.props.match.path.replace('login','')}bootstrap`)