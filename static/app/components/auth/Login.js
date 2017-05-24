import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {loginUser} from './actions';

const form = reduxForm({
  form: 'login'
});

class Login extends React.Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  };

  handleFormSubmit(formProps) {
    return this.props.loginUser(formProps)
    .then(() => {
      console.log('Logged in');
      return this.props.dispatch(push('/dashboard'));
    })
    .catch((e) => {
      console.log('Could not log in', e);
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
      <div>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, {loginUser})(form(Login));
