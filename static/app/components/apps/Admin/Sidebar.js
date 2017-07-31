import React from 'react';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Nav, NavItem, Collapse} from 'reactstrap';

import CookieTypes from '~/static/Cookies';

import {Roles, getRole} from '~/static/Roles';

class Sidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    cookies: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.cookies.get(CookieTypes.admin.user)
    };
  }

  componentDidUpdate() {
    this.state = {
      user: this.props.cookies.get(CookieTypes.admin.user)
    };
  }

  sidebarSection = (name, ...children) =>
    <Nav pills className="flex-column" key={name}>
      <NavItem>
        {children}
      </NavItem>
    </Nav>;

  sidebarLink = (dest, text, props) =>
    <NavLink key={dest}
      className="nav-link" activeClassName="active" to={'/admin' + dest}
      {...props}>
      {text}
    </NavLink>;

  developerTools = () =>
    <div>
      <span className="sidebar__text navbar-text">
        Developer Tools
      </span>
      {this.sidebarSection('dev',
        this.sidebarLink('/admins', 'Admins')
      )}
    </div>;

  administratorTools = () =>
    <div>
      <span className="sidebar__text navbar-text">
        Administrator Tools
      </span>
      {this.sidebarSection('admin',
        this.sidebarLink('/users', 'Users')
      )}
    </div>;

  sponsorTools = () =>
    <div>
      <span className="sidebar__text navbar-text">
        Sponsor Tools
      </span>
      {this.sidebarSection('sponsor',
        this.sidebarLink('/resumes', 'Resumes'),
      )}
    </div>;

  renderMenu() {
    let role = this.state.user ?
      getRole(this.state.user.role) :
      getRole(Roles.ROLE_MEMBER);

    return (<div>
      {!this.props.authenticated && this.sidebarSection('loggedOut',
          this.sidebarLink('/', 'Home', {exact: true}),
          this.sidebarLink('/login', 'Login')
        )}

      {role >= getRole(Roles.ROLE_DEVELOPER) && this.developerTools()}

      {role >= getRole(Roles.ROLE_ADMIN) && this.administratorTools()}

      {role >= getRole(Roles.ROLE_SPONSOR) && this.sponsorTools()}

      {this.props.authenticated && this.sidebarSection('loggedIn',
          this.sidebarLink('/dashboard', 'Dashboard'),
          this.sidebarLink('/logout', 'Logout')
        )}
    </div>);
  }

  render() {
    let menu = this.renderMenu();

    return (<div>
      <Collapse
        className="col-12 bg-faded sidebar navbar-toggleable-sm width"
        isOpen={this.props.isOpen}>
        {menu}
      </Collapse>
      <div className="col-md-4 col-lg-2 hidden-sm-down sidebar bg-faded">
        {menu}
      </div>
    </div>);
  };
};

function mapStateToProps(state) {
  return {
    authenticated: state.admin.auth.authenticated
  };
};

export default withRouter(connect(mapStateToProps)(withCookies(Sidebar)));
