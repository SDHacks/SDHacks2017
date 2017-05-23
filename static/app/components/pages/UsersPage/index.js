import PropTypes from 'prop-types';
import React from 'react';
import SearchBox from './components/SearchBox';
import UserList from './components/UserList';
import {User as UserPropType} from '~/proptypes';
import {addUsers} from '~/actions';
import {connect} from 'react-redux';
import {loadAllUsers} from '~/data/Users';

class UsersPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadAllUsers().end((err, res) => {
      var users = res.body;
      this.props.dispatch(addUsers(users));
    });
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
