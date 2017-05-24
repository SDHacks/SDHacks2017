import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {addUsers} from './actions';

import {loadStats} from '~/data/Api';

class DashboardPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.cookies = props.cookies;
  }

  componentWillMount() {
    loadStats()
    .then((res) => {
      this.props.dispatch();
    });
  }

  isRole(role, render) {
    const userRole = this.cookies.load('user').role;

    if (userRole === role) {
      return render;
    }

    return false;
  }

  render() {
    let user = this.cookies.get('user');
    return (
      <div>
        <p>Dashboard for {user.username}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(withCookies(DashboardPage));
