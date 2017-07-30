import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

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
    this.props.dispatch(showLoading());

    loadAllApplicants()
    .then(res => {
      this.props.dispatch(hideLoading());
      return this.props.dispatch(replaceApplicants(res));
    })
    .catch(console.error);
  }

  render() {
    let {applicants} = this.props.resumes;
    return (
      <div>
        <ResumeList applicants={applicants}></ResumeList>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resumes: state.admin.resumes,
});

export default connect(mapStateToProps)(ResumesPage);
