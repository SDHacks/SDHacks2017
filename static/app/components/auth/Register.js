import {Field, SubmissionError, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {registerUser} from './actions';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = ({input, type, meta}) =>
  (<div>
    <input className="form-control" type={type} {...input}/>
    {meta && meta.touched && meta.error &&
      <div className="error">{meta.error}</div>}
  </div>);

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object
};

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Please enter an username';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

class Register extends React.Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps)
    .then(() => {
      console.log('Registered!');
      this.props.dispatch(push('/dashboard'));
    })
    .catch((e) => {
      throw new SubmissionError({_error: 'Registration failed'});
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}

        <div className="row">
          <div className="col-md-12">
            <label>Username</label>
            <Field name="username" className="form-control" type="text"
              component={renderField} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control" type="password"
              component={renderField} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, {registerUser})(form(Register));
