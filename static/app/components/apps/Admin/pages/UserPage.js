import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {loadUser} from '~/data/Api';

import {updateUser} from './UsersPage/actions';

import User from '../User';

class UserPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    loadUser(this.props.match.params.id)
    .then(res => {
      this.setState({user: res.user});
    })
    .catch(console.error);
  }

  onUserUpdate(user) {
    updateUser(user)(this.props.dispatch);
  }

  render() {
    if (this.state.user === null) {
      return (<div>Loading...</div>);
    }

    return (
      <User user={this.state.user} initialValues={this.state.user}
        onSubmit={this.onUserUpdate.bind(this)} />
    );
  }
}

export default connect()(UserPage);
