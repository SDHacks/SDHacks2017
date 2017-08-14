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
    filtered: PropTypes.number.isRequired,
    resumes: PropTypes.shape(ResumePropType).isRequired,

    toggleFilter: PropTypes.func.isRequired,
    toggleFilterOption: PropTypes.func.isRequired,
    selectAllOptions: PropTypes.func.isRequired,
    selectNoneOptions: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  /**
   * Creates an object which maps all properties of every applicant to a unique
   * list of values for that property.
   * @param {Object[]} applicants The list of applicants to iterate over.
   * @returns {Object} A mapping of applicant property to unique array of
   * values.
   */
  createFilterOptions = (applicants) => {
    if (applicants.length < 1) {
      return {};
    }

    let modelApplicant = applicants[0];
    return Object.keys(modelApplicant)
    .reduce((total, curr) => {
      total[curr] = [...new Set(applicants.map(item => item[curr]))];
      return total;
    }
    , {});
  }

  render() {
    let {user, filters, resumes, filtered} = this.props;
    let filterOptions = this.createFilterOptions(resumes.applicants);

    return (
      <div className="admin-body d-flex flex-column">

        <div className="container-fluid p-0 w-100 h-100">
          <div className="d-flex flex-column flex-md-row h-100">
            <div className={`admin-sidebar__container
              admin-sidebar__container--authenticated`}>
              <Sidebar user={user} selected={filtered}
                total={resumes.applicants.length}
                toggleFilter={this.props.toggleFilter}
                toggleFilterOption={this.props.toggleFilterOption}
                selectAllOptions={this.props.selectAllOptions}
                selectNoneOptions={this.props.selectNoneOptions}
                filters={filters}
                filterOptions={filterOptions} />
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
    user: state.admin.auth.user,
    filtered: state.admin.resumes.filtered
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
