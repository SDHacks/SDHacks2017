import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {UncontrolledAlert} from 'reactstrap';

const form = reduxForm({
  form: 'userLogin'
});

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  };

  /**
   * Handles the validated form data, and logs the user in.
   * @param {Object} formProps The validated form data.
   */
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  /**
   * Creates a new error alert if there was a login error
   * @returns {Component}
   */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="user-login__error">
          <UncontrolledAlert color="danger">
            <strong>{this.props.errorMessage}</strong>
          </UncontrolledAlert>
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form className="user-login"
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="user-login__above">
          {this.renderAlert()}
        </div>
        <div className="user-login__container">
          <div className="user-login__username">
            <Field name="username" className="form-control" component="input"
              type="text" placeholder="Username" />
          </div>
          <div className="user-login__password">
            <Field name="password" className="form-control" component="input"
              type="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary user-login__button">
            Login
          </button>
        </div>
        <div className="user-login__below">
        </div>
      </form>
    );
  }
}

export default form(Login);
