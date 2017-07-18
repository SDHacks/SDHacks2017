import {Switch, Route} from 'react-router-dom';
import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import {AUTH_USER} from './auth/actions/types';
import Nav from './Nav';
import Sidebar from './Sidebar';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import Login from './auth/Login';
import Logout from './auth/Logout';
import NotFoundPage from './pages/NotFound';
import Register from './auth/Register';
import UsersPage from './pages/UsersPage';
import AdminsPage from './pages/AdminsPage';
import ResumesPage from './pages/ResumesPage';
import UserPage from './pages/UserPage';

class Admin extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    children: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    // Check initial authentication
    const {cookies} = this.props;
    if (cookies.get('token')) {
      props.dispatch({type: AUTH_USER});
    }
  }

  routes() {
    return (
      <Switch>
        <Route exact path="/admin/" component={HomePage} />
        <Route path="/admin/register" component={Register} />
        <Route path="/admin/login" component={Login} />

        <PrivateRoute path="/admin/logout" component={Logout} />
        <PrivateRoute path="/admin/dashboard" component={Dashboard} />
        <PrivateRoute path="/admin/admins" component={AdminsPage} />
        <PrivateRoute path="/admin/resumes" component={ResumesPage} />

        <PrivateRoute path="/admin/user/:id" component={UserPage}/>
        <PrivateRoute path="/admin/users" component={UsersPage} />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="admin-body">
        <LoadingBar className="loading-bar" />

        {/*Top bar navigation*/}
        <Nav></Nav>

        <div className="container-fluid">
          {/*Sidebar navigation*/}
          <div className="row">
            <Sidebar></Sidebar>
          </div>

          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            {this.routes()}
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(withCookies(Admin)));
