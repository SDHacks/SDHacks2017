import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {loginUser} from './auth/actions';
import Login from './auth/Login';

class LoginPage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

    loginUser: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired
  };

  loginUser = (formProps) => {
    let {loginUser, history} = this.props;
    return loginUser(formProps)
    .then(() => history.push('/user'))
    .catch((e) => {
      console.error('Could not log in', e);
    });
  };

  render() {
    let {loginError} = this.props;

    return (
      <Login loginUser={this.loginUser} errorMessage={loginError} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.auth.user,
    loginError: state.user.auth.error
  };
};

export default connect(mapStateToProps, {loginUser})(withRouter(LoginPage));
