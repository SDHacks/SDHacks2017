import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {replaceAdmins} from './actions';

import {loadAllAdmins} from '~/data/Api';

import AdminList from './components/AdminList';

class AdminsPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.dispatch(showLoading());

    loadAllAdmins()
    .then(res => {
      this.props.dispatch(hideLoading());
      return this.props.dispatch(replaceAdmins(res));
    })
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
