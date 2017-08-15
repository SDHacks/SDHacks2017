import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
   * Creates a new error alert if there was a login error
   * @returns {Component}
   */
  renderAlert(message) {
    if (message) {
      return (
        <div className="user-page__error">
          <UncontrolledAlert color="danger">
            <div className="container">
              {message}
            </div>
          </UncontrolledAlert>
        </div>
      );
    }
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
            {this.renderAlert('This is an example warning.')}
          </div>
          <div className="user-page__header">
            <a href="/">
              <img className="user-page__logo"
                src="/assets/img/vectors/logo.svg"/>
            </a>
            <span className="user-page__header-text">
              Your Application
            </span>
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
