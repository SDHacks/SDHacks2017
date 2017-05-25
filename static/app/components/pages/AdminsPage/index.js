import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {replaceAdmins} from './actions';

import {loadAllAdmins} from '~/data/Api';

import AdminList from './components/AdminList';

class AdminsPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadAllAdmins()
    .then(res => this.props.dispatch(replaceAdmins(res)))
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <AdminList></AdminList>
      </div>
    );
  }
}

export default connect(null)(AdminsPage);
