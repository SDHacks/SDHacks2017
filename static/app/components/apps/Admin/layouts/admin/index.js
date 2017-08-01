import React from 'react';
import PropTypes from 'prop-types';
import {withCookies} from 'react-cookie';
import {connect} from 'react-redux';

import CookieTypes from '~/static/Cookies';

import Nav from './components/Nav';
import Sidebar from './components/Sidebar';

class AdminLayout extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    cookies: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false,
      user: this.props.cookies.get(CookieTypes.admin.user)
    };
  }

  componentDidUpdate() {
    if (this.state.isSidebarOpen) {
      this.setState({
        isSidebarOpen: false
      });
    }

    this.state = {
      user: this.props.cookies.get(CookieTypes.admin.user)
    };
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
    let {authenticated} = this.props;
    let {user} = this.state;

    return (
      <div className="admin-body">
        {/*Top bar navigation*/}
        <Nav toggleSidebar={this.toggleSidebar.bind(this)}></Nav>

        <div className="container-fluid">
          {/*Sidebar navigation*/}
          <div className="row">
            <Sidebar authenticated={authenticated}
              isOpen={this.state.isSidebarOpen} user={user}></Sidebar>
          </div>

          <main className={'col-sm-9 offset-sm-3 col-md-8' +
            ' col-lg-10 offset-md-4 offset-lg-2 pt-3'}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.admin.auth.authenticated
  };
};

export default connect(mapStateToProps)(withCookies(AdminLayout));
