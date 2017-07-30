import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {loadAllStats} from './actions';

import CookieTypes from '~/static/Cookies';

import {getRole, Roles} from '~/static/Roles';

class DashboardPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    dispatch: PropTypes.func.isRequired,
    stats: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.cookies = props.cookies;
  }

  componentWillMount() {
    this.state = {
      role: this.props.cookies.get(CookieTypes.admin.user).role
    };

    this.props.dispatch(loadAllStats());
  }

  render() {
    let user = this.cookies.get(CookieTypes.admin.user);
    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Dashboard</h1>
          <h2 className="text-left">
            {user.username}
            <small> ({this.state.role})</small>
          </h2>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-block">
              <h3 className="card-title">Total Users</h3>
              <p className="card-text">
                {this.props.stats.users.total.toLocaleString()}
              </p>
              {getRole(this.state.role) >= getRole(Roles.ROLE_ADMIN) &&
                <Link to="/admin/users" className="btn btn-primary">See Users</Link>
              }
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-block">
              <h3 className="card-title">Unique Universities</h3>
              <p className="card-text">
                {this.props.stats.university.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.admin.auth,
    stats: state.admin.dashboardStats
  };
}

export default connect(mapStateToProps)(withCookies(DashboardPage));
