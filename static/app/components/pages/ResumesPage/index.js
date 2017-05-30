import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {replaceApplicants} from './actions';

import {loadAllApplicants} from '~/data/Api';

import {Resumes as ResumePropTypes} from '~/proptypes';

import ResumeList from './components/ResumeList';

class ResumesPage extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    resumes: PropTypes.shape(
      ResumePropTypes
    ).isRequired
  };

  componentWillMount() {
    loadAllApplicants()
    .then(res => this.props.dispatch(replaceApplicants(res)))
    .catch(console.error);
  }

  render() {
    return (
      <div>
        <ResumeList applicants={this.props.resumes.applicants}></ResumeList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resumes: state.resumes,
});

export default connect(mapStateToProps)(ResumesPage);
