import {Column as ColumnPropTypes, User as UserPropTypes} from '~/proptypes';

import PropTypes from 'prop-types';
import React from 'react';
import User from './User';
import {connect} from 'react-redux';

class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(
      UserPropTypes
    ).isRequired).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape(
      ColumnPropTypes
    ).isRequired).isRequired
  };

  render() {
    return (
      <table className="table table-sm">
        <thead className="thead-default">
          <tr>
            {Object.values(this.props.columns).map(column =>
              <th
                key={column.name}>
                {column.name}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.users.map(user =>
            <User
              key={user._id}
              {...user}
              columns={this.props.columns}
            />
          )}
        </tbody>
      </table>
    );
  }
}

const getFilteredUsers = (users, filter) => {
  if (filter !== '') {
    return users.filter((user) => user.firstName.indexOf(filter) !== -1 ||
      user.lastName.indexOf(filter) !== -1 ||
      user._id.indexOf(filter) !== -1);
  } else {
    return users;
  }
};

const mapStateToProps = (state) => ({
  users: getFilteredUsers(state.users, state.filter),
  columns: state.columns
});

export default connect(
  mapStateToProps
)(UserList);

