import React, { Component } from 'react';

class PageComponent extends  Component{
      render(){
            let { onChangeDataSize } = this.props
            let _this = this;
            //当前页码
            let cur = this.props.current;
            //显示分页按钮
            let pageNum = [];
            let begin;
            let len;
            if(_this.props.totalPage > 5){
                  len = 5;
                  if(cur >= (_this.props.totalPage-2)) {
                        begin = _this.props.totalPage - 4;
                  }else if(cur <= 3){
                        begin = 1;      
                  }else{     
                        begin = cur - 2;
                  }
            }else{    
                  len = _this.props.totalPage;
                  begin = 1;
            }
            //根据返回的总记录数计算当前页显示的数据
            for(let i = 0; i < len; i ++){
                  let cur = this.props.current;
                  let showI = begin + i;
                  if(cur == showI){ 
                        pageNum.push({num : showI, cur : true});
                  }else{
                        pageNum.push({num : showI, cur : false});
                  }
            }
            return(
                  <div className="paginationDiv">    
                        <a className={this.props.current == 1? 'prev disable' : 'prev'} onClick={this.props.goPrev.bind(this)}></a>                
                        <span>         
                              {  
                                    pageNum.map(function(curPageNum){
                                          return(<a onClick = {_this.props.pageClick.bind(_this,curPageNum.num)} className={curPageNum.cur ? 'num current' :  'num'}>{curPageNum.num}</a>)})                 
                              }        
                        </span>
                        <a className={this.props.current == this.props.total? 'next disable' : 'next'} onClick={this.props.goNext.bind(this)}></a>                                                            
                        <div className="rightDiv">
                              <select onChange={onChangeDataSize}>
                                    <option>10条/页</option>
                                    <option>30条/页</option>
                                    <option>50条/页</option>
                                    <option>100条/页</option>
                                    <option>500条/页</option>
                              </select>
                              共 <span className="num-total">{_this.props.total}</span> 条， 
                              <button>上一页</button>&nbsp;<button>下一页</button> 
                              共 <span className="num-total">{_this.props.totalPage}</span> 页，
                              到第 <input type="text" value={_this.props.goValue} onChange={this.props.switchChange.bind(this)}/> 页
                        </div>
                  </div>
            )
      }
}
export default PageComponent;