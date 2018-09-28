import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');


function onMonthCellContentRender(value) {
  // console.log('month-calendar onMonthCellContentRender', (value && value.format(format)));
  return `${value.month() + 1}月`;
}

class MonthCalendarComponent extends Component {
  static propTypes = {
    defaultValue: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      value: props.defaultValue,
    };
  }

  onChange = (value) => {
    let { dateFormat } = this.props
    console.log(`DatePicker change: ${value && value.format(dateFormat)}`);
    this.setState({
      value,
    });
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    let { dateFormat } = this.props
    const state = this.state;
    const calendar = dateFormat === 'YYYY-MM' ? (<MonthCalendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
      //disabledDate={disabledDate}
      //onSelect={onStandaloneSelect}
      //onChange={onStandaloneChange}
      monthCellContentRender={onMonthCellContentRender}
      defaultValue={defaultCalendarValue}
    />) : <Calendar locale={cn ? zhCN : enUS}/>;
    
    return (
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
        >
          {
            ({ value }) => {
              return (<input
                readOnly
                disabled={state.disabled}
                value={value && value.format(dateFormat) || ''}
                placeholder="请选择日期"
              />);
            }
          }

        </DatePicker>
     );
  }
}

export default MonthCalendarComponent