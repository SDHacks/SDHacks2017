import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import LoginPage from './pages/auth/Login';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  routes() {
    return (
      <Switch>
        <Route exact path="/user/login" component={LoginPage} />
      </Switch>
    );
  }

  render() {
    return this.routes();
  }
}

export default withRouter(connect()(User));
