import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import {AUTH_USER} from './auth/actions/types';
import Nav from './Nav';
import Sidebar from './Sidebar';

class App extends React.Component {
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

  render() {
    return (
      <div className="admin-body">
        <LoadingBar showFastActions className="loading-bar" />

        {/*Top bar navigation*/}
        <Nav></Nav>

        <div className="container-fluid">
          {/*Sidebar navigation*/}
          <div className="row">
            <Sidebar></Sidebar>
          </div>

          <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(withCookies(App)));
