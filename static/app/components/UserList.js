import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const UserList =({users}) => (
  <ul>
    <li><b>FirstName LastName - ID</b></li>
    {users.map(user =>
      <User
      key={user._id}
      {...user}
      />
    )}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default UserList;
