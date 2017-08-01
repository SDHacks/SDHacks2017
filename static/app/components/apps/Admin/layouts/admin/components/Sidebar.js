import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {NavbarToggler} from 'reactstrap';

import ToggleSwitch from '~/components/ToggleSwitch';

import {Roles, getRole} from '~/static/Roles';

class Sidebar extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onEditChange: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    user: PropTypes.object,
    isHidden: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      isHidden: this.props.isHidden ? this.props.isHidden : true
    };
  }

  /**
   * Toggles whether the menu is hidden on small devices
   */
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

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

    /**
     * Creates the menu based off user role and authentication
     */
  renderMenu() {
    let auth = this.props.isAuthenticated;

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

  /**
   * Creates the user menu for the authenticated user
   */
  renderUser() {
    let {user, isEditing} = this.props;

    return (
      <div className="admin-sidebar__user-box">
        <div className="admin-sidebar__user-name text-uppercase">
          User: {user.username}
        </div>
        <div className="admin-sidebar__user-role">
          Your Role: {user.role}
        </div>
        <div className="admin-sidebar__user-toggle">
          <ToggleSwitch onChange={this.props.onEditChange}
            checked={isEditing} />
          <div className="admin-sidebar__user-editing">
            Editing:&nbsp;
            <span className="text-uppercase">{isEditing ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let auth = this.props.isAuthenticated;

    return (<div className="admin-sidebar">
      <div className={`admin-sidebar__header navbar-toggleable-md
        navbar-inverse`}>
        <img className="admin-sidebar__logo"
          src="/assets/img/vectors/logo.svg"/>
        <span className="admin-sidebar__header-text">
          Admin Dashboard
        </span>
        <NavbarToggler right
          className="admin-sidebar__toggler"
          onClick={this.toggleHidden.bind(this)} />
      </div>

      <div className={this.state.isHidden ? 'hidden-sm-down' : ''}>
        {auth && this.renderUser()}

        {this.renderMenu()}
      </div>
    </div>);
  };
};



export default Sidebar;
