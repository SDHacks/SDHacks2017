import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {UncontrolledAlert} from 'reactstrap';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import UserProfile from './components/UserProfile';
import {getCurrentUser} from './actions';

class UserPage extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,

    getCurrentUser: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
  };

  componentWillMount() {
    let {showLoading, hideLoading, getCurrentUser} = this.props;

    showLoading();

    getCurrentUser()
    .then(() => {
      hideLoading();
    })
    .catch(console.error);
  }

  /**
   * Creates a new error alert if there was a login error.
   * @param {String} message The message to display in the alert.
   * @param {String} type The type of alert to show.
   * @returns {Component}
   */
  renderAlert(message, type='danger') {
    if (message) {
      return (
        <div className="user-page__error">
          <UncontrolledAlert color={type}>
            <div className="container">
              {message}
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
    case ('Confirmed'):
      button = (<button type="button" className={`btn rounded-button
        rounded-button--small rounded-button--short user-page__rsvp`}>
        RSVP
      </button>);
    };

    return (<span>
      Status:&nbsp;
      <span className={`user-page__status
        user-page__status--${status.toLowerCase()}`}>
        {status}
      </span>
      {button}
    </span>);
  }

  render() {
    let {user} = this.props;

    return (
      <div className="user-page">
        <div className="hexagon-hero__background user-page__background">
          <div className="hexagon-hero__water"></div>
          <div className="hexagon-hero__beach"></div>
        </div>
        <div className="user-page__above">
          <div className="user-page__alerts">

          </div>
          <div className="user-page__header">
            <div className="user-page__header-left">
              <a href="/">
                <img className="user-page__logo"
                  src="/assets/img/vectors/logo.svg"/>
              </a>
              <span className="user-page__header-text">
                Your Application
              </span>
            </div>
            <div className="user-page__header-center">
              <div className="user-page__nav container">
                {this.renderUserStatus(user.status)}
                <Link to="/logout"
                  className="sd-link__underline user-page__logout">Logout</Link>
              </div>
            </div>
            <div className="user-page__header-right">
            </div>
          </div>
        </div>

        <div className="user-page__container container">
          <UserProfile user={user} initialValues={user} />
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
    getCurrentUser: bindActionCreators(getCurrentUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
