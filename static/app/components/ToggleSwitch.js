import React from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.checked
    };
  }

  /**
   * Toggles the checkbox value
   */
  toggle() {
    let newState = !this.state.isChecked;
    this.setState({
      isChecked: newState
    });

    if (this.props.onChange) {
      this.props.onChange(newState);
    }
  }

  render() {
    let {checked} = this.props;

    return (
      <div className="switch">
        <input id="toggle-switch"
          className="toggle-switch toggle-switch-round-flat"
          type="checkbox" onChange={this.toggle.bind(this)}
          checked={checked} />
        <label htmlFor="toggle-switch"></label>
      </div>
    );
  }
}

export default ToggleSwitch;
