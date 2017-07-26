import {Field, reduxForm} from 'redux-form';
import {Cookies, withCookies} from 'react-cookie';
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes, {instanceOf} from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {User as UserPropType} from '~/proptypes';

import {getRole, Roles} from '~/static/Roles';

import CheckboxButton from './CheckboxButton';

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape(
      UserPropType
    ).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    resume: PropTypes.object,
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.cookies = props.cookies;
  }

  componentWillMount() {
    this.state = {
      role: this.props.cookies.get('user').role
    };
  }

  handleFormSubmit(formProps) {
    return formProps;
  }

  renderResume() {
    return [
      <label key="0" className="col-sm-2 col-form-label">
        Download Resume
      </label>,
      <div key="1" className="col-sm-4">
        <a className="btn btn-primary form-control"
          role="button" target="_blank"
          disabled={!this.props.resume} href={this.props.resume.url} download>
          Download
        </a>
      </div>
    ];
  }

  renderFormCheckbox(label, value, fieldSize = 'col-sm-10',
    labelSize='col-sm-2') {
    return [
      <label key="0" className={labelSize + ' col-form-label'}>{label}</label>,
      <div key="1" className={fieldSize + ' btn-group'} data-toggle="buttons">
        <Field component={CheckboxButton} name={value} />
      </div>];
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
        <Link to={`/admin/user/${this.props.user._id}`}>
          <h3>User <small>{this.props.user._id}</small></h3>
        </Link>
        <form onSubmit={handleSubmit}>
          <h4>Personal Details</h4>
          <div className="form-group row mb-4">
            {this.renderFormField('First Name', 'firstName', 'col-sm-4')}
            {this.renderFormField('Last Name', 'lastName', 'col-sm-4')}
            {this.renderFormField('Gender', 'gender', 'col-sm-4')}
            {this.renderFormField('Birthdate', 'birthdate', 'col-sm-4')}
            {this.renderFormField('Graduating', 'year', 'col-sm-4')}
            {this.renderFormField('Phone', 'phone', 'col-sm-4', 'tel')}
            {this.renderFormField('Shirt Fit', 'shirtFit', 'col-sm-4')}
            {this.renderFormField('Shirt Size', 'shirtSize', 'col-sm-4')}
            {this.renderFormField('Email', 'email')}
            {this.renderFormField('University', 'university')}
          </div>
          <h4>Portfolio</h4>
          <div className="form-group row mb-4">
            {this.renderFormField('Github', 'github', 'col-sm-4')}
            {this.renderFormField('Website', 'website', 'col-sm-4')}
          </div>
          {this.props.resume &&
          <span>
            <h4>Resume</h4>
            <div className="form-group row mb-4">
              {this.renderResume()}
              {this.renderFormCheckbox('Share Resume', 'shareResume',
              'col-sm-2')}
            </div>
          </span>}
          <h4>Preferences</h4>
          <div className="form-group row mb-4">
            {this.renderFormField('Diet', 'diet', 'col-sm-10')}
            {this.renderFormField('Food', 'food', 'col-sm-10')}
            {this.renderFormField('Outcome', 'outcomeStmt', 'col-sm-10')}
            {this.renderFormCheckbox('First Hackathon', 'firstHackathon',
              'col-sm-10')}
          </div>
          <h4>Status</h4>
          <div className="form-group row mb-4">
            {this.renderFormCheckbox('Out Of State', 'travel.outOfState',
              'col-sm-2')}
            {this.renderFormField('Coming From', 'travel.city', 'col-sm-6')}
            {this.renderFormField('Major Classes', 'majors')}
          </div>
          {getRole(this.state.role) >= getRole(Roles.ROLE_ADMIN) &&
            <span>
              <h4>Admin Flags</h4>
              <div className="form-group row mb-4">
                {this.renderFormCheckbox('Confirmed', 'confirmed', 'col-sm-2')}
                {this.renderFormCheckbox('Checked In', 'checkedIn', 'col-sm-2')}
                {this.renderFormCheckbox('Bussing', 'bussing', 'col-sm-2')}
                {this.renderFormField('Categories', 'categories')}
              </div>
            </span>
          }
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
    reduxForm({
      destroyOnUnmount: true
    })
)(withCookies(User));
