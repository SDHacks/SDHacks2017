import React from 'react';
import PropTypes from 'prop-types';

export default class RSVPConfirm extends React.Component {
  static propTypes = {
    isConfirmed: PropTypes.bool,

    onStateChange: PropTypes.func.isRequired,
    uncheckedMessage: PropTypes.string.isRequired,
    checkedMessage: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.isConfirmed ? props.isConfirmed : false
    };
  }

  onStateChange = () => {
    this.setState({
      checked: !this.state.checked
    });
    this.props.onStateChange(this.state.checked);
  }

  render() {
    let {checked} = this.state;
    let {uncheckedMessage, checkedMessage} = this.props;

    return (
      <div className="rsvp-confirm">
        {!checked ?
          <button className={`rounded-button rounded-button--small
            rounded-button--success rounded-button--short rsvp-confirm__button`}
            onClick={this.onStateChange}>
            {uncheckedMessage}
          </button> :
          <div className="rsvp-confirm__checked">
            <i className="fa fa-check" aria-hidden="true"></i>{' '}
            {checkedMessage}{' '}
            <i className="rsvp-confirm__close fa fa-window-close"
              aria-hidden="true" onClick={this.onStateChange}></i>
          </div>}
      </div>
    );
  }
}
