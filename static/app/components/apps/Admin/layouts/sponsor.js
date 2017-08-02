import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Resumes as ResumePropType} from '~/proptypes';

import {toggleFilter, toggleFilterOption, selectAllOptions,
  selectNoneOptions} from '../actions';

import Sidebar from './components/SponsorSidebar';

class SponsorLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    resumes: PropTypes.shape(ResumePropType).isRequired,

    toggleFilter: PropTypes.func.isRequired,
    toggleFilterOption: PropTypes.func.isRequired,
    selectAllOptions: PropTypes.func.isRequired,
    selectNoneOptions: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {user, filters, resumes} = this.props;

    return (
      <div className="admin-body d-flex flex-column">

        <div className="container-fluid p-0 w-100 h-100">
          <div className="d-flex flex-column flex-md-row h-100">
            <div className={`admin-sidebar__container
              admin-sidebar__container--authenticated`}>
              <Sidebar user={user} selected={0}
                total={resumes.applicants.length}
                toggleFilter={this.props.toggleFilter}
                toggleFilterOption={this.props.toggleFilterOption}
                selectAllOptions={this.props.selectAllOptions}
                selectNoneOptions={this.props.selectNoneOptions}
                filters={filters} />
            </div>

            <main className={'admin-body__content'}>
              {this.props.children}
            </main>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    filters: state.admin.filters,
    resumes: state.admin.resumes,
    user: state.admin.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFilter: bindActionCreators(toggleFilter, dispatch),
    toggleFilterOption: bindActionCreators(toggleFilterOption, dispatch),
    selectAllOptions: bindActionCreators(selectAllOptions, dispatch),
    selectNoneOptions: bindActionCreators(selectNoneOptions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SponsorLayout);
