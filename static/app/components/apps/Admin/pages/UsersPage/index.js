import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {addUsers, addColumn, updateUser, removeColumn} from './actions';

import {loadAllUsers} from '~/data/Api';

import {Column as ColumnPropTypes, User as UserPropTypes} from '~/proptypes';

import ColumnEditor from './components/ColumnEditor';
import UserList from './components/UserList';

class UsersPage extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(
      UserPropTypes
    ).isRequired).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape(
      ColumnPropTypes
    ).isRequired).isRequired,

    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    addUsers: PropTypes.func.isRequired,
    addColumn: PropTypes.func.isRequired,
    removeColumn: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  componentWillMount() {
    let {users, showLoading, hideLoading, addUsers} = this.props;
    if (!users.length) {
      showLoading();

      loadAllUsers()
      .then(res => {
        hideLoading();
        return addUsers(res);
      });
    }
  }

  /**
   * Handles an updated user.
   * @param {Object} user The updated user.
   */
  onUserUpdate = (user) =>
    this.props.updateUser(user);

  onAddColumn = (columnName) =>
    this.props.addColumn(columnName)

  onRemoveColumn = (columnName) =>
    this.props.removeColumn(columnName)

  render() {
    return (
      <div className="d-flex flex-column h-100 p-3">
        <ColumnEditor columns={this.props.columns}
          onAddColumn={this.onAddColumn} onDeleteColumn={this.onRemoveColumn} />
        <UserList users={this.props.users} columns={this.props.columns}
          onUserUpdate={this.onUserUpdate} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.users,
  columns: state.admin.userColumns
});

function mapDispatchToProps(dispatch) {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
    addUsers: bindActionCreators(addUsers, dispatch),
    addColumn: bindActionCreators(addColumn, dispatch),
    removeColumn: bindActionCreators(removeColumn,dispatch),
    showLoading: bindActionCreators(showLoading, dispatch),
    hideLoading: bindActionCreators(hideLoading, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
