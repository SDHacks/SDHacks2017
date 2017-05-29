import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {addUsers, setFilter} from './actions';

import {loadAllUsers} from '~/data/Api';

import SearchBox from './components/SearchBox';
import UserList from './components/UserList';

class UsersPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
  };

  componentWillMount() {
    loadAllUsers()
    .then(res => this.props.dispatch(addUsers(res)));
  }

  render() {
    return (
      <div>
        <SearchBox filter={this.props.filter}
          onSubmit={(values) => this.props.dispatch(setFilter(values.filter))}
          ></SearchBox>
        <UserList></UserList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.userFilter
});

export default connect(mapStateToProps)(UsersPage);
