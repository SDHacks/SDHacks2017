import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {addUsers, updateUser} from './actions';

import {loadAllUsers} from '~/data/Api';

import {Column as ColumnPropTypes, User as UserPropTypes} from '~/proptypes';

import UserList from './components/UserList';

class UsersPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape(
      UserPropTypes
    ).isRequired).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape(
      ColumnPropTypes
    ).isRequired).isRequired
  };

  componentWillMount() {
    if (!this.props.users.length) {
      this.props.dispatch(showLoading());

      loadAllUsers()
      .then(res => {
        this.props.dispatch(hideLoading());
        return this.props.dispatch(addUsers(res));
      });
    }
  }

  onUserUpdate(user) {
    updateUser(user)(this.props.dispatch);
  }

  render() {
    return (
      <div>
        <UserList users={this.props.users} columns={this.props.columns}
          onUserUpdate={this.onUserUpdate.bind(this)}>
        </UserList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  columns: state.userColumns
});

export default connect(mapStateToProps)(UsersPage);
