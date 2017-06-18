import {Field, reduxForm, formValueSelector} from 'redux-form';
import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {User as UserPropType} from '~/proptypes';

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape(
      UserPropType
    ).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    resume: PropTypes.object
  };

  handleFormSubmit(formProps) {
    return formProps;
  }

  renderResume() {
    return [
      <label key="0" className="col-sm-2 col-form-label">Download Resume</label>,
      <div className="col-sm-4">
        <a key="1" className="btn btn-primary form-control"
          role="button" target="_blank"
          disabled={!this.props.resume} href={this.props.resume.url} download>
          Download
        </a>
      </div>
    ];
  }

  renderFormField(label, value, fieldSize = 'col-sm-10',
    fieldType = 'text', labelSize = 'col-sm-2') {
    return [
      <label key="0" className={labelSize + ' col-form-label'}>{label}</label>,
      <div key="1" className={fieldSize}>
        <Field name={value} className="form-control"
          component="input" type={fieldType} />
      </div>];
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group row mb-4">
            {this.renderFormField('First Name', 'firstName', 'col-sm-4')}
            {this.renderFormField('Last Name', 'lastName', 'col-sm-4')}
            {this.renderFormField('Gender', 'gender', 'col-sm-4')}
            {this.renderFormField('Birthdate', 'birthdate', 'col-sm-4')}
            {this.renderFormField('Graduating', 'year', 'col-sm-4')}
            {this.renderFormField('Major', 'major', 'col-sm-4')}
            {this.renderFormField('Phone', 'phone', 'col-sm-4', 'tel')}
            {this.renderFormField('Shirt', 'shirtSize', 'col-sm-4')}
            {this.renderFormField('Email', 'email')}
            {this.renderFormField('University', 'university')}
          </div>
          <div className="form-group row mb-4">
            {this.renderFormField('Github', 'github', 'col-sm-4')}
            {this.renderFormField('Website', 'website', 'col-sm-4')}
          </div>
          <div className="form-group row mb-4">
            {this.props.resume && this.renderResume()}
            {this.renderFormField('Share Resume', 'shareResume', 'col-sm-2')}
          </div>
          <div className="form-group row mb-4">
            {this.renderFormField('Diet', 'diet', 'col-sm-10')}
            {this.renderFormField('Food', 'food', 'col-sm-10')}
            {this.renderFormField('Outcome', 'outcomeStmt', 'col-sm-10')}
            {this.renderFormField('First Hackathon', 'firstHackathon',
              'col-sm-10')}
          </div>
          <div className="form-group row mb-4">
            {this.renderFormField('Confirmed', 'confirmed', 'col-sm-2')}
            {this.renderFormField('Checked In', 'checkedIn', 'col-sm-2')}
            {this.renderFormField('Bussing', 'bussing', 'col-sm-2')}
          </div>
          <button type="submit" className="btn btn-primary"
            disabled={pristine || submitting}>Apply</button>
          <button type="button" disabled={pristine || submitting}
            className="btn btn-secondary" onClick={reset}>
            Reset
          </button>
        </form>
      </div>
    );
  }
}

// Sets the form name to the id of the user
const mapStateToProps = (state, ownProps) => {
  return {
    resume: ownProps.user.resume ? ownProps.user.resume : null,
    form: ownProps.user._id
  };
};

export default compose(
    connect(mapStateToProps),
    reduxForm({})
)(User);
