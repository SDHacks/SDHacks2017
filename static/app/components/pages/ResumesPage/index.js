import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {replaceApplicants} from './actions';

import {loadAllApplicants} from '~/data/Api';

import ResumeList from './components/ResumeList';

class ResumesPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadAllApplicants()
    .then(res => this.props.dispatch(replaceApplicants(res)))
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <ResumeList></ResumeList>
      </div>
    );
  }
}

export default connect(null)(ResumesPage);
