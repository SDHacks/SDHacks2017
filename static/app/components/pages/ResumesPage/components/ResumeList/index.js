import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {Resumes as ResumePropTypes} from '~/proptypes';

class ResumeList extends React.Component {
  static propTypes = {
    resumes: PropTypes.shape(
      ResumePropTypes
    ).isRequired
  };

  render() {
    return (
      <div>{this.props.resumes.applicants.length}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  resumes: state.resumes,
});

export default connect(
  mapStateToProps
)(ResumeList);

