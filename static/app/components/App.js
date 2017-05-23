import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';

import {AUTH_USER} from '~/actions/types';
import React from 'react';
import {connect} from 'react-redux';

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
      <div>
        <p>Header here</p>

        <div className="container">
          {this.props.children}
        </div>

        <p>Footer here</p>
      </div>
    );
  }
}

export default connect()(withCookies(App));
