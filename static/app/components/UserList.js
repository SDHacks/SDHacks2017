import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import {Column as ColumnPropTypes, User as UserPropTypes} from '../proptypes';

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

export default UserList;
