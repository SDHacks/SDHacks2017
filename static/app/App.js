import React from 'react';
import User from './User.js';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import pref from 'superagent-prefix';

var prefix = pref('/admin');


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  getInitialState() {
    return {
      loaded: false
    };
  }
  componentWillMount() {
    request
      .get('/users')
      .use(prefix)
      .use(nocache)
      .end((err, res) => {
        this.users = res.body;
        this.setState({loaded: true});
      });
  }
  renderUser(user) {
    return <div key={user._id}>{user.firstName}</div>;
  }
  render() {
    if (!this.state || !this.state.loaded) {
      return <div>Loading...</div>;
    }

    let users = this.users.map(this.renderUser);

    return (
      <div>
        {users}
      </div>
    );
  }
}
