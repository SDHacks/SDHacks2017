import {Field, reduxForm} from 'redux-form';

import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {registerUser} from '../../actions';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
  <div>
    <input className="form-control" {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

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
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps)
    .then(() => {
      console.log('Registered!');
      this.props.dispatch(push('/dashboard'));
    })
    .catch((e) => {
      console.log('Could not register', e);
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
            <Field name="username" className="form-control"
              component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control"
              component={renderField} type="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, {registerUser})(form(Register));
