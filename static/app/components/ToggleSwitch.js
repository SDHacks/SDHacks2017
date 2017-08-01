import React from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.checked ? props.checked : false
    };
  }

  /**
   * Toggles the checkbox value
   */
  toggle() {
    this.setState({
      isChecked: !this.state.isChecked
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.isChecked);
    }
  }

  render() {
    let {isChecked} = this.state;

    return (
      <div className="switch">
        <input id="toggle-switch"
          className="toggle-switch toggle-switch-round-flat"
          type="checkbox" onChange={this.toggle.bind(this)}
          checked={isChecked} />
        <label htmlFor="toggle-switch"></label>
      </div>
    );
  }
}

export default ToggleSwitch;
