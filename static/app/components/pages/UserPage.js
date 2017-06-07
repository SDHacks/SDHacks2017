import React from 'react';
import PropTypes from 'prop-types';

import {loadUser} from '~/data/Api';

import User from '~/components/User';

class UserPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    loadUser(this.props.match.params.id)
    .then(res => {
      this.setState({user: res.user});
    });
  }

  render() {
    if (this.state.user === null) {
      return (<div>Loading...</div>);
    }

    return (
      <User user={this.state.user} />
    );
  }
}

export default UserPage;
