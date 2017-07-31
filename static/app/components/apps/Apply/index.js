import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ApplyPage from './pages/ApplyPage';

class Apply extends React.Component {

  /**
   * The routes for the /apply route.
   */
  routes() {
    return (
      <Switch>
        <Route exact path="/apply/" component={ApplyPage} />
      </Switch>
    );
  }

  render() {
    return this.routes();
  }
}

export default withRouter(connect()(Apply));
