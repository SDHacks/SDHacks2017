import {Switch, Route} from 'react-router-dom';
import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {AUTH_USER} from './auth/actions/types';
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/DashboardPage';
import Logout from './auth/Logout';
import NotFoundPage from './pages/NotFound';
import RegisterPage from './auth/Register';
import UsersPage from './pages/UsersPage';
import AdminsPage from './pages/AdminsPage';
import ResumesPage from './pages/ResumesPage';
import UserPage from './pages/UserPage';
import CheckinPage from './pages/CheckinPage';
import AdminLayout from './layouts/admin';
import SponsorLayout from './layouts/sponsor';

import CookieTypes from '~/static/Cookies';

class Admin extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    // Check initial authentication
    const {cookies} = this.props;
    if (cookies.get(CookieTypes.admin.token)) {
      props.dispatch({
        type: AUTH_USER,
        payload: cookies.get(CookieTypes.admin.user)
      });
    }
  }

  /**
   * Render a route with the Administrator layout.
   * @param {Component} Component The child component to render within the
   * layout.
   * @returns {Component}
   */
  renderAdmin = (Component) => {
    let component = <Component />;
    return () =>
      (<AdminLayout>
        {component}
      </AdminLayout>);
  }

  /**
   * Render a route with the Sponsor layout.
   * @param {Component} Component The child component to render within the
   * layout.
   * @returns {Component}
   */
  renderSponsor = (Component) => {
    let component = <Component />;
    return () =>
      (<SponsorLayout>
        {component}
      </SponsorLayout>);
  }

  routes() {
    return (
      <Switch>
        <Route exact path="/admin/"
          component={this.renderAdmin(Dashboard)} />
        <Route path="/admin/register"
          component={this.renderAdmin(RegisterPage)} />

        <PrivateRoute path="/admin/logout"
          component={this.renderAdmin(Logout)} />
        <PrivateRoute path="/admin/admins"
          component={this.renderAdmin(AdminsPage)} />
        <PrivateRoute path="/admin/resumes"
          component={this.renderSponsor(ResumesPage)} />

        <PrivateRoute path="/admin/user/:id"
          component={this.renderAdmin(UserPage)} />
        <PrivateRoute path="/admin/users"
          component={this.renderAdmin(UsersPage)} />

        <PrivateRoute path="/admin/checkin"
          component={CheckinPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  render() {
    return this.routes();
  }
}

export default withRouter(connect()(withCookies(Admin)));
