import React from 'react';
import PropTypes from 'prop-types';

const User = ({_id, firstName, lastName}) => (
  <tr>
    <td>{_id}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
  </tr>
);

User.propTypes = {
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};

export default User;
