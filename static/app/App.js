import React from 'react';
import User from './User.js';
import {DeliveryService, Store} from 'react-at-rest';

Store.API_PATH_PREFIX = 'admin';

export default class App extends DeliveryService {
  constructor(props) {
    super(props);
    this.UserStore = new Store('users');
  }
  bindResources() {
    this.subscribeAll(this.UserStore);
  }
  renderUser(user) {
    return <div key={user.firstName}>{user.firstName}</div>;
  }
  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.state.users.map(function(user) {
          return this.renderUser(user);
        }, this)}
      </div>
    );
  }
}
