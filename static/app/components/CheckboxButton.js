import React from 'react';
import PropTypes from 'prop-types';

class CheckboxButton extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.input.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.input.value});
  }

  updateValue() {
    let newState = !this.state.value;
    this.setState({value: newState});
    this.props.input.onChange(newState);
  }

  render() {
    const {value} = this.state;

    let active = value ? 'active' : '';
    let text = value ? 'True' : 'False';
    return (
      <label className={'btn btn-outline-primary btn-block checkbox-button ' + active}>
        <input type="checkbox" value={value} autoComplete="off"
          onChange={() => this.updateValue()} /> {text}
      </label>
    );
  }
}

export default CheckboxButton;
