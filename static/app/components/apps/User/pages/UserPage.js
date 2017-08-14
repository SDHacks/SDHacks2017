import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    let {user} = this.props;

    return (
      <div>Welcome, {user.username} (or should I say '{user._id}')
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.auth.user
  };
}

export default connect(mapStateToProps)(UserPage);
