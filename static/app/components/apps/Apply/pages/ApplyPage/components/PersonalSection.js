import {Field, reduxForm} from 'redux-form';
import React from 'react';
import PropTypes from 'prop-types';

import fields from './Fields';
import validate from './validate';

class PersonalSection extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (<div>
      {fields.createRow(
        fields.createColumn('col-md-6',
          fields.createLabel('First Name'),
          fields.createInput('firstName', 'First Name')
        ),
        fields.createColumn('col-md-6',
          fields.createLabel('Last Name'),
          fields.createInput('lastName', 'lastName')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('Email'),
          fields.createInput('email', 'email@university.edu', 'email',
            'sd-form__input-email')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('Birthdate'),
          <div className="row">
            {fields.createColumn('col-sm-4',
              fields.createMonthPicker()
            )}
            {fields.createColumn('col-sm-4',
              fields.createInput('birthdate_day', 'Day')
            )}
            {fields.createColumn('col-sm-4',
              fields.createInput('birthdate_year', 'Year')
            )}
          </div>
        )
      )}

      {fields.createRow(
        fields.createColumn('col-md-6',
          fields.createLabel('Gender'),
          fields.createGenderPicker()
        ),
        fields.createColumn('col-md-6',
          fields.createLabel('Phone Number'),
          fields.createInput('phone', '555-555-5555', 'text',
            'sd-form__input-text',this.normalizePhone)
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12 no-margin-bottom',
          fields.createLabel('Institution')
        ),
        fields.createColumn('col-md-6 col-lg-4 col-lg-offset-2',
          fields.createInstitutionCard('uni', 'institution-radio-uni',
            'University')
        ),
        fields.createColumn('col-md-6 col-lg-4 col-lg-offset-2',
          fields.createInstitutionCard('hs', 'institution-radio-hs',
            'High School')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('University'),
          fields.createInput('university',
            'The University of California, San Diego'),
          fields.createInput('high-school', 'High School')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-lg-6',
          fields.createLabel('Major'),
          fields.createInput('major', 'Major')
        ),
        fields.createColumn('col-lg-6',
          fields.createLabel('Graduation Year'),
          fields.createInput('year', '2017')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-lg-6',
          fields.createLabel('Github Username'),
          fields.createInput('github', 'Github')
        ),
        fields.createColumn('col-lg-6',
          fields.createLabel('Personal Website'),
          fields.createInput('website', 'http://example.com/')
        )
      )}

      <button className="btn btn-primary" type="submit">Next</button>
    </div>);
  }

  normalizePhone (value, previousValue) {
    if (!value) {
      return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');
    if (!previousValue || value.length > previousValue.length) {
      if (onlyNums.length === 3) {
        return onlyNums + '-';
      }
      if (onlyNums.length === 6) {
        return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-';
      }
    }
    if (onlyNums.length <= 3) {
      return onlyNums;
    }
    if (onlyNums.length <= 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3);
    }
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' +
      onlyNums.slice(6, 10);
  }
}

export default reduxForm({
  form: 'apply',
  destroyOnUnmount: false,
  validate
})(PersonalSection);

