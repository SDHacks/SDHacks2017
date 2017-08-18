import {Switch, Route} from 'react-router-dom';
import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {AUTH_USER} from './pages/auth/actions/types';
import PrivateRoute from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import ForgotPage from './pages/ForgotPage';
import Logout from './pages/auth/Logout';
import UserPage from './pages/UserPage/index';

import CookieTypes from '~/static/Cookies';

class User extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    // Check initial authentication
    const {cookies} = this.props;
    if (cookies.get(CookieTypes.user.token)) {
      props.dispatch({
        type: AUTH_USER,
        payload: cookies.get(CookieTypes.user.user)
      });
    }
  }

  /**
   * The routes for the /user route.
   */
  routes() {
    return (
      <Switch>
        <Route exact path="/user/login" component={LoginPage} />
        <Route exact path="/user/forgot" component={ForgotPage} />

        <PrivateRoute exact path="/user" component={UserPage} />
        <PrivateRoute exact path="/user/logout" component={Logout} />
      </Switch>
    );
  }

  render() {
    return this.routes();
  }
}

export default withRouter(connect()(withCookies(User)));
