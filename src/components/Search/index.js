import React, {Component,Fragment} from "react";
import './search.less';
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag:false
        }
    }

    onflagState = (e) => {
        this.setState({
            flag:e.target.value ? true : false
        })
    }

    onClickState = (e) => {
        this.setState({
            flag:false
        })
    }
   
    render() {
        let { flag } = this.state
        let { value, onChange, onClickSearchLists, selectType, itemName, option } = this.props
        return (
            <Fragment>
                <input
                    type="text"
                    ref='search'
                    value={value}
                    placeholder='请输入'
                    className='InputBOX'
                    onChange={e => {this.onflagState(e);onChange(e, selectType)}}/>
                {
                    flag && <ul className='SearchResults'>
                    {
                        option && option.map((item, index) => {
                          return item[itemName].indexOf(value) == 0 ? <li onClick={e => {this.onClickState();onClickSearchLists(item[itemName], selectType)}} key={index}>{item[itemName]}</li> : ''
                        })
                    }
                    </ul>
                }
            </Fragment>
        );
    }
}
export default Search;