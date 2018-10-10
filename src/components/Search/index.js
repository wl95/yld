import React, {Component,Fragment} from "react";
import './search.less';
class Search extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        let { value, onChange, onClockSearchLists, selectType, itemName, option } = this.props
        return (
            <Fragment>
                <input
                    type="text"
                    ref='search'
                    value={value}
                    placeholder='请输入'
                    className='InputBOX'
                    onChange={e => onChange(e, selectType)}/>
                {
                    !itemName && value && <ul className='SearchResults'>
                    {
                        option && option.map((item, index) => {
                          return item[itemName].indexOf(value) == 0 ? <li onClick={e => onClockSearchLists(item[itemName], selectType)} key={index}>{item[itemName]}</li> : ''
                        })
                    }
                    </ul>
                }
            </Fragment>
        );
    }

}
export default Search;