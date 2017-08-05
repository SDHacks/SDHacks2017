import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {replaceApplicants} from './actions';

import {loadAllApplicants} from '~/data/Api';

import {Resumes as ResumePropTypes} from '~/proptypes';

import ResumeList from './components/ResumeList';

class ResumesPage extends React.Component {
  static propTypes = {
    replaceApplicants: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    resumes: PropTypes.shape(
      ResumePropTypes
    ).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isCompacted: false
    };
  }

  toggleCompacted = () => this.setState({isCompacted: !this.state.isCompacted});

  componentWillMount() {
    let {showLoading, hideLoading, replaceApplicants} = this.props;

    showLoading();

    loadAllApplicants()
    .then(res => {
      hideLoading();
      return replaceApplicants(res);
    })
    .catch(console.error);
  }

  render() {
    let {applicants} = this.props.resumes;
    let {isCompacted} = this.state;

    return (
      <div className="resume-body">
        <ResumeList isCompacted={isCompacted}
          onCompactChange={this.toggleCompacted} applicants={applicants} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resumes: state.admin.resumes,
});

const mapDispatchToProps = (dispatch) => ({
  replaceApplicants: bindActionCreators(replaceApplicants, dispatch),
  showLoading: bindActionCreators(showLoading, dispatch),
  hideLoading: bindActionCreators(hideLoading, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ResumesPage);
