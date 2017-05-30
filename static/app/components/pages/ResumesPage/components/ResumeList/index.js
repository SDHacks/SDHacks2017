import PropTypes from 'prop-types';
import React from 'react';

import {Applicants as ApplicantsPropType} from '~/proptypes';

class ResumeList extends React.Component {
  static propTypes = {
    applicants: PropTypes.arrayOf(
      ApplicantsPropType
    ).isRequired
  };

  render() {
    if (this.props.applicants.length === 0) {
      return (
        <div>Loading Resumes...</div>
      );
    }

    return (
      <div>{this.props.applicants.length}</div>
    );
  }
}

export default ResumeList;

