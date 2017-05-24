import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {addUsers} from './actions';

import {loadAllUsers} from '~/data/Api';

import SearchBox from './components/SearchBox';
import UserList from './components/UserList';

class UsersPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadAllUsers()
    .then(res => this.props.dispatch(addUsers(res)));
  }

  render() {
    return (
      <div>
        <SearchBox></SearchBox>
        <UserList></UserList>
      </div>
    );
  }
}

export default connect(null)(UsersPage);
