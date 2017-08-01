import React from 'react';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';

import {loginUser} from '~/components/apps/Admin/auth/actions';

import Login from '~/components/apps/Admin/auth/Login';

import CookieTypes from '~/static/Cookies';

import Sidebar from './components/Sidebar';

class AdminLayout extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    cookies: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,

    loginUser: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
    this.state = {
      isSidebarOpen: false,
      isEditing: false,
      user: this.props.cookies.get(CookieTypes.admin.user)
    };
  }

  componentDidUpdate() {
    if (this.state.isSidebarOpen) {
      this.setState({
        isSidebarOpen: false
      });
    }

    this.state.user = this.props.cookies.get(CookieTypes.admin.user);
  }

  /**
   * Toggles whether the user is editing
   */
  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  /**
   * Toggles the visibility of the sidebar.
   */
  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
  }

  render() {
    let {isAuthenticated} = this.props;
    let {user, isEditing} = this.state;

    let containerState = 'admin-sidebar__container--' +
      (isAuthenticated ? 'authenticated' : 'logged-out');

    let login = (<Login loginUser={this.props.loginUser}
      errorMessage={this.props.loginError} />);

    return (
      <div className="admin-body d-flex flex-column">

        <div className="container-fluid p-0 w-100 h-100">
          <div className="d-flex flex-column flex-md-row h-100">
            <div className={`admin-sidebar__container ${containerState}`}>
              <Sidebar isEditing={isEditing} isAuthenticated={isAuthenticated}
                user={user} onEditChange={this.toggleEditing.bind(this)}>
                {!isAuthenticated && login}
              </Sidebar>
            </div>

            {isAuthenticated && <main style={{flex: 1}} className="p-3">
              {this.props.children}
            </main>}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.admin.auth.authenticated,
    loginError: state.admin.auth.error
  };
};

export default connect(mapStateToProps, {loginUser})(withCookies(AdminLayout));
