import {Column as ColumnPropTypes, User as UserPropTypes} from '../proptypes';

import PropTypes from 'prop-types';
import React from 'react';
import User from './User';
import {connect} from 'react-redux';

class UserList extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            {Object.keys(this.props.columns).map(column =>
              <th
                key={column}>
                {column}
              </th>
            )}
          </tr>
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

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(
    UserPropTypes
  ).isRequired).isRequired,
  columns: PropTypes.shape(ColumnPropTypes).isRequired
};

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

