import React from 'react';
import PropTypes from 'prop-types';

import {User as UserPropType} from '~/proptypes';

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      UserPropType
    }).isRequired
  };

  render() {
    return (
      <div>
        {user.firstName}
      </div>
    );
  }
}

export default User;
