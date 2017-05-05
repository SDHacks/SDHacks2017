import React from 'react';
import PropTypes from 'prop-types';

const User = ({_id, firstName, lastName}) => (
  <li>
    {firstName} {lastName} - {_id}
  </li>
);

User.propTypes = {
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};

export default User;
