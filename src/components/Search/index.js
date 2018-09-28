import React, {Component,Fragment} from "react";
import './search.less';
class Search extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        let { value, onChange, selectType } = this.props
        return (
            <Fragment>
                <input
                    type="text"
                    ref='search'
                    value={value}
                    placeholder='请输入产品代码'
                    className='InputBOX'
                    onChange={e => onChange(e, selectType)}/>
                <ul className='SearchResults' ref='area_txt'></ul>
            </Fragment>
        );
    }

}
export default Search;