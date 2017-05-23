import PropTypes from 'prop-types';
import React from 'react';
import UserList from '../UserList';
import {User as UserPropType} from '../../proptypes';
import {addUsers} from '../../actions';
import {connect} from 'react-redux';
import {loadAllUsers} from '../../data/Users';

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
      <UserList></UserList>
    );
  }
}

export default connect(null)(UsersPage);
