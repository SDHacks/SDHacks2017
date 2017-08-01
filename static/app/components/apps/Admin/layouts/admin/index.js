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
      <div className="admin-body d-flex flex-column">

        <div className="container-fluid p-0 w-100 h-100">
          <div className="row h-100">
            <div className="col-md-4 col-lg-3 col-xl-2">
              <Sidebar authenticated={authenticated} user={user} />
            </div>

            <main className={'col-md-8 col-lg-9 col-xl-10 pt-3'}>
              {this.props.children}
            </main>
          </div>
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
