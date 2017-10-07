import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {UncontrolledAlert} from 'reactstrap';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import diff from 'object-diff';

import UserProfile from './components/UserProfile';
import {getCurrentUser, updateCurrentUser} from './actions';

import {updateUserField} from '~/data/User';

class UserPage extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,

    getCurrentUser: PropTypes.func.isRequired,
    updateCurrentUser: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      alerts: []
    };
  }

  componentWillMount() {
    document.body.classList.add('user-page__body');

    let {showLoading, hideLoading, getCurrentUser} = this.props;

    showLoading();

    getCurrentUser()
    .then(() => {
      hideLoading();
    })
    .catch(console.error);
  }

  componentWillUnmount () {
    document.body.classList.remove('user-page__body');
  }

  /**
   * Creates a new alert to render to the top of the screen.
   * @param {String} message The message to display in the alert.
   * @param {String} type The type of alert to show.
   * @param {String} title The title of the alert.
   */
  createAlert(message, type='danger', title) {
    this.setState({
      alerts: [...this.state.alerts, {
        message,
        type,
        title
      }]
    });
  }

  /**
   * Creates a new error alert if there was a login error.
   * @param {String} message The message to display in the alert.
   * @param {String} type The type of alert to show.
   * @param {String} title The title of the alert.
   * @param {String} key The given key for the element.
   * @returns {Component}
   */
  renderAlert(message, type='danger', title, key='0') {
    if (message) {
      return (
        <div className="user-page__error" key={key}>
          <UncontrolledAlert color={type}>
            <div className="container">
              <strong>{title}</strong> {message}
            </div>
          </UncontrolledAlert>
        </div>
      );
    }
  }

  /**
   * Renders the status for the navigation bar.
   * @param {String} status The status of the user in the database.
   * @returns {Component}
   */
  renderUserStatus(status) {
    // If there is no status
    if (!status) {
      status = 'Applied';
    }
    let button = <span></span>;

    switch (status) {
    case ('Unconfirmed'):
      button = (<button type="button" className={`btn rounded-button
        rounded-button--small rounded-button--short user-page__rsvp`}>
        RSVP
      </button>);
    };

    let statusText = status;
    switch (status) {
    case ('Unconfirmed'):
    case ('Declined'):
      statusText = 'Not Attending';
    case ('Confirmed'):
      statusText = 'Attending';
    case ('Waitlisted'):
      statusText = 'On Waitlist';
    }

    return (<span>
      Status:&nbsp;
      <span className={`user-page__status
        user-page__status--${status.toLowerCase()}`}>
        {statusText}
      </span>
      {button}
    </span>);
  }

  /**
   * Requests that the server update the current user to the new, given values.
   * @param {Object} newUser The new user object to update to.
   */
  updateUser = (newUser) => {
    let {updateCurrentUser} = this.props;
    let oldUser = this.props.user;
    // Delta is all the changed fields in the form
    const delta = diff(oldUser, newUser);

    updateUserField(delta)
    .then((newUser) => {
      updateCurrentUser(newUser);
      this.createAlert('You have successfully updated your profile', 'success');
    })
    .catch((err) => {
      this.createAlert(err.message, 'danger', 'Something went wrong!');
      console.error(err);
    });
  }

  render() {
    let {alerts} = this.state;
    let {user} = this.props;

    return (
      <div className="user-page">
        <div className="hexagon-hero__background user-page__background">
          <div className="hexagon-hero__water"></div>
          <div className="hexagon-hero__beach"></div>
        </div>
        <div className="user-page__above">
          <div className="user-page__alerts">
            {alerts.map(({message, type, title}, i) =>
              this.renderAlert(message, type, title, i))}
          </div>
          <div className="user-page__header">
            <a href="/">
              <img className="user-page__logo"
                src="/assets/img/vectors/logo.svg"/>
            </a>
            <span className="user-page__header-text">
              Your Application
            </span>
            <div className="user-page__nav container">
              {this.renderUserStatus(user.status)}
              <Link to="/logout"
                className="sd-link__underline user-page__logout">Logout</Link>
            </div>
          </div>
        </div>

        <div className="user-page__container container">
          <UserProfile user={user} initialValues={user}
            onSubmit={this.updateUser} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(showLoading, dispatch),
    hideLoading: bindActionCreators(hideLoading, dispatch),
    getCurrentUser: bindActionCreators(getCurrentUser, dispatch),
    updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
