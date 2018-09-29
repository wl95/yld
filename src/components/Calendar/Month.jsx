import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

const cn = location.search.indexOf('cn') !== -1;

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

  onMonthCellContentRender(value) {
    return `${value.month() + 1}月`;
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  
  render() {
    let { dateFormat, dateValue, onChange, ...calendarProps } = this.props
    const state = this.state;
    console.log(dateFormat)
    const calendar = dateFormat === 'YYYY-MM' ? (<MonthCalendar
      {...calendarProps}
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
      //onSelect={onStandaloneSelect}
      //onChange={onStandaloneChange}
      format={dateFormat || 'YYYY-MM'}
      monthCellContentRender={this.onMonthCellContentRender}
    />) : <Calendar  {...calendarProps} style={{ zIndex: 1000 }} format={dateFormat || 'YYYY-MM-DD'} locale={cn ? zhCN : enUS}/>;
    
    return (
        <DatePicker
          animation="slide-up"
          disabled={state.disabled}
          calendar={calendar}
          value={dateValue}
          onChange={onChange}
        >
          {
            ({ value }) => {
              return (<input
                readOnly
                disabled={state.disabled}
                value={value && value.format(dateFormat) || ''}
                placeholder="请选择"
              />);
            }
          }
        </DatePicker>
     );
  }
}

export default MonthCalendarComponent