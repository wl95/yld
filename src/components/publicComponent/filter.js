import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapDispatchToProps from './mapDispatch'
import mapStateToProps from './mapState'
import { request, filterAPI } from 'utils'
import MonthDate from 'components/Calendar'
import queryString from 'query-string'
import moment from 'moment';
import Search from '../Search'
import './index.less'

class Filter extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            tableResult: '',
            filed: {

            },
            branch_data: {},
            city_data: {},
            searchList: [],
            dateFormat: 'YYYY-MM-DD',
        }
    }

    componentDidMount() {
        this.fetch()
    }

    /* 首次打开页面 */
    fetch = () => {
        let { filter, getAuthority, setFilter } = this.props
        let { search, href } = location
        let locationSearch = queryString.parse(search)
        let { filed } = this.state
        let herfStr = href;
        let juris = {}
        let index = herfStr.indexOf('?');
        herfStr = herfStr.slice(index + 1);

        if (herfStr.indexOf('organCode') !== -1 && herfStr.indexOf('organLevel') !== -1) {
            // 参数正确得传入
            herfStr.split('&').map(item => {//把获取参数存入本地存储
                return item.split('=')
            }).forEach(item => {
                localStorage.setItem(item[0], item[1]);
                juris[item[0]] = item[1]
            })
            getAuthority(juris)
            // filed.organ_level = juris.organLevel == 0 ? '1' : juris.organLevel
            // filed.organCode = juris.organCode
            this.setState({
                filed
            })
        } else {
            //参数未正确传入
            window.location.href = '/Home/managemoney'
        }
        filter && filter.map((item, index) => {
            filed[item.selectType] = filed[item.selectType] || item.defaultValue
            // console.log(item)
            if (locationSearch.UPDATE_DATE_END) {
                filed['UPDATE_DATE_END'] = moment(locationSearch.UPDATE_DATE_END, 'YYYY-MM-DD');
            }
            if (locationSearch.UPDATE_DATE_START) {
                filed['UPDATE_DATE_START'] = moment(locationSearch.UPDATE_DATE_START, 'YYYY-MM-DD');
            }
            this.setState({
                filed
            })
            //请求
            filterAPI[item.requestType] && item.method && request({
                method: item.method,
                url: filterAPI[item.requestType]
            }).then(resData => {
                if (item.requestType === 'saleRange') {
                    // console.log(resData);
                }
                resData = resData[item.selectKey] ? resData[item.selectKey] : resData
                if (!(resData instanceof Array)) {
                    alert('后台数据有问题');
                }
                setFilter(resData, index)
            })
        })
    }

    onModeChange = (mode) => {
        let dateFormat = {
            'daily': 'YYYY-MM-DD',
            'monthly': 'YYYY-MM',
            'quarterly': 'YYYY',
            'yearly': 'YYYY'
        }

        this.setState({
            dateFormat: dateFormat[mode]
        });
        // console.log(dateFormat[mode])
    }

    onChangeSelect = (e, item, isData) => {
        let { selectType } = item
        let { filed } = this.state
        let { filter, setSearch } = this.props

        if (selectType === 'date_type') {
            this.onModeChange(e.target.value)
        }

        if (selectType.toUpperCase() === 'CUST_CATEGORY') {
            filter.map((item, index) => {
                if (item.selectType.toUpperCase() === 'CUST_TYPE') {
                    filter[index].disabled = e.target.value == 1 ? true : false;
                }
            })
            setSearch(filter)
            this.setState({
                filed
            })
        }
        /* 权限等于1的时候 */
        this.jurisDiction('1', selectType, e, 'PROVINCE_CODE', 'PREFECTURE_CODE', [
            {
                "label": "地市级",
                "order": "1",
                "value": "2"
            }
        ])
        /* 权限等于2的时候 */
        this.jurisDiction('2', selectType, e, 'PREFECTURE_CODE', 'CITY_CODE', [
            {
                "label": "市县级",
                "order": "1",
                "value": "3"
            }
        ])
        /* 权限等于3的时候 */
        this.jurisDiction('3', selectType, e, 'CITY_CODE', 'BRANCE_CODE', [
            {
                "label": "网点级",
                "order": "1",
                "value": "4"
            }
        ])

        this.setState({
            filed: {
                ...filed,
                [selectType]: isData ? e : e.target.value,
            },
        })
    }

    jurisDiction = (organLevel, selectType, e, juris1, juris2, option) => {
        let locationSearch = queryString.parse(location.search)
        let { filter, setSearch } = this.props
        let { filed } = this.state
        if (selectType.toUpperCase() === juris1 && locationSearch.organLevel === organLevel) {
            if (locationSearch.organCode === e.target.value) {
                filter.map((item, index) => {
                    if (item.selectType.toUpperCase() === juris2) {
                        filter[index].disabled = false
                    }
                })
            } else {
                filter.map((item, index) => {
                    if (item.selectType.toUpperCase() === juris2) {
                        filter[index].disabled = true
                    }
                })
                if (organLevel === '1') {
                    filed.prefecture_code = ''
                    filter.map(item => {
                        if (item.selectType.toUpperCase() === 'ORGAN_LEVEL') {
                            item.option = [
                                {
                                    "label": "省级",
                                    "order": "1",
                                    "value": "1"
                                },
                                {
                                    "label": "地市级",
                                    "order": "1",
                                    "value": "2"
                                }
                            ]
                        }
                    })
                }
                if (organLevel === '2') {
                    filed.city_code = ''
                    filter.map(item => {
                        if (item.selectType.toUpperCase() === 'ORGAN_LEVEL') {
                            item.option = [
                                {
                                    "label": "地市级",
                                    "order": "1",
                                    "value": "2"
                                },
                                {
                                    "label": "市县级",
                                    "order": "1",
                                    "value": "3"
                                },
                            ]
                        }
                    })
                }
                if (organLevel === '3') {
                    filed.brance_code = ''
                    filter.map(item => {
                        if (item.selectType.toUpperCase() === 'ORGAN_LEVEL') {
                            item.option = [
                                {
                                    "label": "市县级",
                                    "order": "1",
                                    "value": "3"
                                },
                                {
                                    "label": "网点级",
                                    "order": "1",
                                    "value": "4"
                                },
                            ]
                        }
                    })
                }
            }
            setSearch(filter)
        }
        if (selectType.toUpperCase() === juris2 && e.target.value && locationSearch.organLevel === organLevel) {
            filed.organ_level = organLevel < 3 ? String(Number(organLevel) + 1) : '4'
            filter.map(item => {
                if (item.selectType.toUpperCase() === 'ORGAN_LEVEL') {
                    item.option = option
                }
            })

            setSearch(filter)
        }
    }

    onSubmit = () => {
        this.fetch();
        let { onFilterSubmit } = this.props
        let { filed, dateFormat } = this.state
        onFilterSubmit({ filed, dateFormat })
    }

    onClickSearchs = (value, selectType) => {
        let { filed } = this.state
        this.setState({
            filed: {
                ...filed,
                [selectType]: value
            }
        })
    }

    onReset = () => {
        let { onFilterSubmit } = this.props
        this.setState({
            filed: {},
        })
        onFilterSubmit()
    }

    /* 判断开始日期和结束日期 */
    disabledDate = (UPDATE_DATE, Item) => {
        const { dateCalendarType, relationship } = Item
        const { filed } = this.state
        //const { UPDATE_DATE_START, UPDATE_DATE_END } = this.state.filed;
        if (!UPDATE_DATE) {
            return false;
        }

        if (!filed[relationship]) {
            return false;
        }
        return dateCalendarType == 'start' ? filed[relationship].isBefore(UPDATE_DATE) : UPDATE_DATE.isBefore(filed[relationship])
    }

    onBack = () => {
        history.go(-1)
    }

    render() {
        let { filed, dateFormat } = this.state
        let { filter } = this.props
        return (
            <div className="form">
                <div className="back"><a onClick={this.onBack}>返回</a></div>
                {
                    filter && filter.map(item => {
                        return (
                            <div key={item.text} className="cols">
                                <label>{item.text}</label>
                                {item.type === 1 && <Search value={filed[item.selectType] || ''} onClickSearchLists={this.onClickSearchs} onChange={e => this.onChangeSelect(e, item, false)} selectType={item.selectType} itemName={item.itemName} option={item.option} />}
                                {item.type === 2 &&
                                    <select className={"select " + (item.disabled ? 'disabled' : '')} disabled={item.disabled} value={filed[item.selectType] || item.defaultValue || ''} onChange={e => this.onChangeSelect(e, item, false)}>
                                        <option value="">请选择</option>
                                        {
                                            item.option && item.option.map((optionItem, index) => {
                                                return <option key={optionItem[(item.itemKey)] + ',' + index} value={optionItem[(item.itemKey)]}>{optionItem[item.itemName]}</option>
                                            })
                                        }
                                    </select>}
                                {item.type === 3 &&
                                    <MonthDate
                                        dateFormat={item.dateFormat || dateFormat}
                                        dateValue={filed[item.selectType]}
                                        disabledDate={(value) => this.disabledDate(value, item)}
                                        defaultValue={item.defaultValue}
                                        onChange={e => this.onChangeSelect(e, item, true)}
                                    />}
                            </div>
                        )
                    })
                }
                <div className="go">
                    <button onClick={this.onSubmit}>查询</button>
                    <button onClick={this.onReset}>重置</button>
                </div>
            </div>
        )
    }
}

export default Filter