import React from 'react';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {Roles, getRole} from '~/static/Roles';

class Sidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    cookies: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.cookies.get('user')
    };
  }

  componentDidUpdate() {
    this.state = {
      user: this.props.cookies.get('user')
    };
  }

  sidebarSection = (name, ...children) =>
    <ul className="nav nav-pills flex-column" key={name}>
      <li className="nav-item">
        {children}
      </li>
    </ul>;

  sidebarLink = (dest, text, props) =>
    <NavLink key={dest}
      className="nav-link" activeClassName="active" to={dest} {...props}>
      {text}
    </NavLink>;

  render() {
    let role = this.state.user ?
      getRole(this.state.user.role) :
      getRole(Roles.ROLE_MEMBER);

    return (
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        {!this.props.authenticated && this.sidebarSection('loggedOut',
          this.sidebarLink('/', 'Home', {exact: true}),
          this.sidebarLink('/login', 'Login')
        )}

        {role >= getRole(Roles.ROLE_ADMIN) && this.sidebarSection('admin',
          this.sidebarLink('/users', 'Users')
        )}

        {role >= getRole(Roles.ROLE_SPONSOR) && this.sidebarSection('sponsor',
          this.sidebarLink('/dashboard', 'Dashboard'),
        )}

        {this.props.authenticated && this.sidebarSection('loggedIn',
          this.sidebarLink('/logout', 'Logout')
        )}
      </nav>
    );
  };
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
};

export default withRouter(connect(mapStateToProps)(withCookies(Sidebar)));
