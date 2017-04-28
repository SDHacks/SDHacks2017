import React from 'react';
import ReactDOM from 'react-dom';
import User from './User.js';
import nocache from 'superagent-no-cache';
import request from 'superagent';
import pref from 'superagent-prefix';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

var prefix = pref('/admin');


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  getColumns() {
    return [{
      header: 'First Name',
      accessor: 'firstName'
    }];
  }
  render() {
    if (!this.state || !this.state.loaded) {
      return <div>Loading...</div>;
    }

    return (<ReactTable
      data={this.users}
      columns={this.getColumns()}>
    </ReactTable>);
  }
}
