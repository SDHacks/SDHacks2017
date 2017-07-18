import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ApplyPage from './pages/ApplyPage';

class Apply extends React.Component {
  constructor(props) {
    super(props);
  }

  routes() {
    return (
      <Switch>
        <Route exact path="/apply/" component={ApplyPage} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="apply-body">
        {this.routes()}
      </div>
    );
  }
}

export default withRouter(connect()(Apply));
