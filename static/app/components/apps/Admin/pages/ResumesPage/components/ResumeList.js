import PropTypes from 'prop-types';
import React from 'react';

import ToggleSwitch from '~/components/ToggleSwitch';

import {Applicants as ApplicantsPropType} from '~/proptypes';

class ResumeList extends React.Component {
  static propTypes = {
    onCompactChange: PropTypes.func.isRequired,
    isCompacted: PropTypes.bool.isRequired,
    applicants: PropTypes.arrayOf(PropTypes.shape(
      ApplicantsPropType
    ).isRequired).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      columns: {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'year': 'Year',
        'university': 'University',
        'gender': 'Gender'
      }
    };
  }

  /**
   * Creates a header by the given name
   * @param {String} name The name of the column to display
   * @returns {Component} The header component to render
   */
  renderHeader(name) {
    return (<th key={name} className="resume-list__header">
      {name}
    </th>);
  }

  render() {
    let {columns} = this.state;
    let {applicants, isCompacted, onCompactChange} = this.props;
    console.log(isCompacted);

    return (
      <table className={`resume-list table ${isCompacted ? 'table-sm' : ''}`}>
        <thead>
          <tr className="resume-list__row">
            <th className="resume-list__header resume-list__header--spacer">
            </th>

            {Object.values(columns).map(name => this.renderHeader(name))}

            <th className="resume-list__header resume-list__toggle">
              <ToggleSwitch checked={isCompacted} onChange={onCompactChange} />
              Compact View:&nbsp;
              <span className={`resume-list__compacted text-uppercase
              ${isCompacted ? 'resume-list__compacted--active' :
              'resume-list__compacted--inactive'}`}>
                {isCompacted ? 'ON' : 'OFF'}
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          {applicants.map(applicant =>
            <tr className="resume-list__row">
              <td className="resume-list__value resume-list__value--spacer">
              </td>
              {Object.keys(columns).map(column =>
                <td className="resume-list__value">
                  {applicant[column]}
                </td>
              )}
              <td className="resume-list__value">
                <button className={`btn rounded-button rounded-button--small
                  ${isCompacted ? 'resume-list__btn--compacted' : ''}`}>
                  Download Resume
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default ResumeList;

