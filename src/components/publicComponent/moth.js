import 'rc-calendar/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar/lib/Calendar';

import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

class Demo extends React.Component {
  state = {
    mode: 'month',
    rangeStartMode: 'date',
    rangeEndMode: 'date',
    startValue:'',
    endValue:'',
  };

  onChange(e, selcet){
    if(selcet){
      this.setState({
        [selcet]: e.target.value
      })
    }
  }

  onModeChange = (key) => {
    return function _handleChange(e) {
      let mode;
      if (e && e.target) {
        mode = e.target.value;
      } else {
        mode = e;
      }
      console.log('change to: ', mode);
      this.setState({
        [key]: mode,
      });
    }.bind(this);
  }

  handlePanelChange = (...args) => {
    console.log('on panel change', ...args);
  }

  render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <h2>controle Calendar panel</h2>
        <select
          value={this.state.mode}
          style={{ width: 500 }}
          onChange={this.onModeChange('mode')}
        >
          {['date','month'].map(item => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
        <Calendar
          mode={this.state.mode}
          onPanelChange={this.handlePanelChange}
        />
        <Calendar
          mode={this.state.mode}
          onPanelChange={this.handlePanelChange}
        />
      </div>
    );
  }
}

export default Demo