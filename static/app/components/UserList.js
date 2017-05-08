import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const UserList =({users}) => (
  <table>
    <tbody>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
      </tr>
      {users.map(user =>
        <User
          key={user._id}
          {...user}
        />
      )}
    </tbody>
  </table>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default UserList;
