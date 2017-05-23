import PropTypes from 'prop-types';
import React from 'react';
import {User as UserPropType} from '../../proptypes';
import {addUsers} from '../../actions';
import {connect} from 'react-redux';
import {loadAllUsers} from '../../data/Users';

class UsersPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape(UserPropType)).isRequired
  };

  componentWillMount() {
    loadAllUsers().end((err, res) => {
      var users = res.body;
      this.props.dispatch(addUsers(users));
    });
  }

  render() {
    if (this.props.users.length === 0) {
      //TODO: Mockup skeleton-frame until users load
      return null;
    }

    return (
      <div>
        You have privileges to see all the users:

        {this.props.users.map((user) =>
          (<div>
            {user.firstName}
          </div>)
        )}</div>
    );
  }
}

function mapStateToProps(state) {
  return {users: state.users};
}

export default connect(mapStateToProps)(UsersPage);
