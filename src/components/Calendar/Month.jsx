import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

class MonthCalendarComponent extends Component {
  static propTypes = {
    defaultValue: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      showTime: true,
      disabled: false,
      value: props.defaultValue,
    };
  }

  onChange = (value) => {
    console.log(`DatePicker change: ${value && value.format(format)}`);
    this.setState({
      value,
    });
  }

  onShowTimeChange = (e) => {
    this.setState({
      showTime: e.target.checked,
    });
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    const state = this.state;
    const calendar = (<MonthCalendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
    />);
    return (<div style={{ width: 240, margin: 20 }}>
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block',
        lineHeight: 1.5,
        marginBottom: 22,
      }}
      >
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
                style={{ width: 200 }}
                readOnly
                disabled={state.disabled}
                value={value && value.format(format)}
                placeholder="请选择日期"
              />);
            }
          }

        </DatePicker>
      </div>
    </div>);
  }
}

export default MonthCalendarComponent