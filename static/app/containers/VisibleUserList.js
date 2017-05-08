import {connect} from 'react-redux';
import UserList from '../components/UserList';

const getFilteredUsers = (users, filter) => {
  if (filter !== '') {
    return users.filter((user) => user.firstName.indexOf(filter) !== -1);
  } else {
    return users;
  }
};

const mapStateToProps = (state) => ({
  users: getFilteredUsers(state.users, state.filter)
});

const VisibleUserList = connect(
  mapStateToProps
)(UserList);

export default VisibleUserList;
