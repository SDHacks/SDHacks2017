import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
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
            {this.props.errorMessage}
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
        <div className="hexagon-hero__background user-login__background">
          <div className="hexagon-hero__water"></div>
          <div className="hexagon-hero__beach"></div>
        </div>
        <div className="user-login__above">
          <div className="user-login__alerts">
            {this.renderAlert()}
          </div>
          <div className="user-login__header">
            <a href="/">
              <img className="user-login__logo"
                src="/assets/img/vectors/logo.svg"/>
            </a>
            <span className="user-login__header-text">
              Applicants
            </span>
          </div>
        </div>
        <div className="user-login__container sd-form">
          <div className="user-login__username row sd-form__row">
            <div className="col-12">
              <label>Username</label>
              <Field name="username" component="input" type="text"
                className="form-control sd-form__input-text"
                placeholder="Username" />
            </div>
          </div>
          <div className="user-login__password row sd-form__row">
            <div className="col-12">
              <label>Password</label>
              <Field name="password" component="input" type="password"
                className="form-control sd-form__input-text"
                placeholder="Password" />
            </div>
          </div>
          <div className="row sd-form__row">
            <div className="col-12">
              <button type="submit" className={`btn rounded-button
                rounded-button--small user-login__button`}>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="user-login__below">
          <div className="row sd-form__row">
            <div className="col-12">
              <Link to="/apply" className={`btn rounded-button
                rounded-button--secondary rounded-button--small
                user-login__apply`}>
                I don't have an account, I still need to apply
              </Link>
            </div>
          </div>
          <div className="row sd-form__row">
            <div className="col-12">
              <Link to="/user/forgot"
                className="sd-link__underline user-login__forgot">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default form(Login);
