import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {UncontrolledAlert} from 'reactstrap';

import {loginUser} from './actions';

const form = reduxForm({
  form: 'adminLogin'
});

class LoginPage extends React.Component {
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
    return this.props.loginUser(formProps)
    .then(() => {
      return this.context.router.history.push('/admin/dashboard');
    })
    .catch((e) => {
      console.error('Could not log in', e);
    });
  }

  /**
   * Creates a new error alert if there was a login error
   * @returns {Component}
   */
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <UncontrolledAlert color="danger">
          Could not log in <strong>{this.props.errorMessage}</strong>
        </UncontrolledAlert>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div>
          <label>Username</label>
          <Field name="username" className="form-control" component="input"
            type="text" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" className="form-control" component="input"
            type="password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.admin.auth.error,
    message: state.admin.auth.message
  };
}

export default connect(mapStateToProps, {loginUser})(form(LoginPage));
