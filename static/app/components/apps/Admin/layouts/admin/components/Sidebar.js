import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import ToggleSwitch from '~/components/ToggleSwitch';

import {Roles, getRole} from '~/static/Roles';

class Sidebar extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  sidebarSection = (name, ...children) =>
    <div className="admin-sidebar__section">
      <div className="admin-sidebar__section-title text-uppercase">
        {name}
      </div>
      {children}
    </div>;

  sidebarLink = (dest, text, props) =>
    <NavLink key={dest} className="admin-sidebar__section-link"
      to={'/admin' + dest} activeClassName="admin-sidebar__section-link--active"
      {...props}>
      {text}
    </NavLink>;

  developerTools = () =>
    this.sidebarSection('Developer Tools',
      this.sidebarLink('/admins', 'Admins')
    )

  administratorTools = () =>
    this.sidebarSection('Administrator Tools',
      this.sidebarLink('/users', 'Users')
    );

  sponsorTools = () =>
    this.sidebarSection('Sponsor Tools',
      this.sidebarLink('/resumes', 'Resumes'),
    );

  renderMenu() {
    let auth = this.props.authenticated;

    let role = this.props.user ?
      getRole(this.props.user.role) :
      getRole(Roles.ROLE_MEMBER);

    return (<div>
      {!auth && this.sidebarSection('General',
          this.sidebarLink('/', 'Home', {exact: true}),
          this.sidebarLink('/login', 'Login')
        )}

      {auth && role >= getRole(Roles.ROLE_DEVELOPER) && this.developerTools()}

      {auth && role >= getRole(Roles.ROLE_ADMIN) && this.administratorTools()}

      {auth && role >= getRole(Roles.ROLE_SPONSOR) && this.sponsorTools()}

      {auth && this.sidebarSection('General',
          this.sidebarLink('/dashboard', 'Dashboard'),
          this.sidebarLink('/settings', 'Settings'),
          this.sidebarLink('/logout', 'Logout')
        )}
    </div>);
  }

  render() {
    return (<div className="admin-sidebar">
      <div className="admin-sidebar__header">
        <img className="admin-sidebar__logo"
          src="/assets/img/vectors/logo.svg"/>
        <span className="admin-sidebar__header-text">
          Admin Dashboard
        </span>
      </div>

      <div className="admin-sidebar__user-box">
        <div className="admin-sidebar__user-name text-uppercase">
          User: Redback
        </div>
        <div className="admin-sidebar__user-role">
          Your Role: Developer
        </div>
        <div className="admin-sidebar__user-toggle">
          <ToggleSwitch />
          <div className="admin-sidebar__user-editing">
            Editing: <span className="text-uppercase">OFF</span>
          </div>
        </div>
      </div>

      {this.renderMenu()}
    </div>);
  };
};



export default Sidebar;
