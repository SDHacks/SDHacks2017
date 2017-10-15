import {Switch, Route} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ApiPage from './pages/ApiPage';
import SchedulePage from './pages/SchedulePage';
import LiveLayout from './layouts/live';

class Admin extends React.Component {
  /**
   * Render a route with the LIve layout.
   * @param {Component} Component The child component to render within the
   * layout.
   * @returns {Component}
   */
  renderLive = (Component) => {
    let component = <Component />;
    return () =>
      (<LiveLayout>
        {component}
      </LiveLayout>);
  }

  routes() {
    return (
      <Switch>
        <Route exact path="/live/"
          component={this.renderLive(ApiPage)} />
        <Route exact path="/live/schedule"
          component={this.renderLive(SchedulePage)} />
      </Switch>
    );
  }

  render() {
    return this.routes();
  }
}

export default withRouter(connect()(Admin));