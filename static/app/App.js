import React from 'react';
import User from './User.js';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import pref from 'superagent-prefix';

var prefix = pref('/admin');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }
  componentWillMount() {
    request
      .get('/users')
      .use(prefix)
      .use(nocache)
      .end((err, res) => {
        this.state.users = res.body;
        this.state.loaded = true;
      });
  }
  renderUser(user) {
    return <div key={user._id}>{user.firstName}</div>;
  }
  render() {
    if (!this.state) {
      return <div>Loading...</div>;
    }

    let users = this.state.users.map(this.renderUser);

    return (
      <div>
        {users}
      </div>
    );
  }
}
