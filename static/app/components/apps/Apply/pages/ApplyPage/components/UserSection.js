import {Field, reduxForm} from 'redux-form';
import React from 'react';
import PropTypes from 'prop-types';

import fields from './Fields';
import validate from './validate';

class UserSection extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    previousPage: PropTypes.func.isRequired,
    submitError: PropTypes.object
  }

  /**
   * Create a checkbox to accept the Code of Conduct.
   * @returns {Component}
   */
  createAcceptBox() {
    return (<Field component='input' type='checkbox'
      className='sd-form__input-checkbox' name='accept' />);
  }

  render() {
    const {previousPage, handleSubmit, pristine, submitting, submitError} =
      this.props;
    return (<form onSubmit={handleSubmit}>
      {fields.createRow(
        fields.createColumn('col-sm-12',
          <h4 key="0">You're Almost Done!</h4>,
          <h5 key="1">To complete your application, please create an account</h5>
        ),
        fields.createColumn('col-md-6',
          fields.createLabel('Username'),
          fields.createInput('username', 'Username')
        ),
        fields.createColumn('col-md-6',
          fields.createLabel('Password'),
          fields.createInput('password', 'Password', 'password')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          <span>
            I agree to the terms of both the&nbsp;
            <a
              className="sd-link__underline sd-link__hover-purple"
              href='https://git.io/v7B63'>MLH Contest Terms and Conditions</a>
            &nbsp;and the&nbsp;
            <a
              className="sd-link__underline sd-link__hover-purple"
              href='https://git.io/v7B6Z'>MLH Privacy Policy</a>.
            Please note that you may
            receive pre and post-event informational e-mails and occasional
            messages about hackathons from MLH as per the&nbsp;
            <a
              className="sd-link__underline sd-link__hover-purple"
              href='https://git.io/v7B6Z'>MLH Privacy Policy</a>.
          </span>
        ),
        fields.createColumn('col-sm-12',
          this.createAcceptBox(),
          <span>I accept the&nbsp;
            <a
              className="sd-link__underline sd-link__hover-purple"
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
            >
              MLH Code of Conduct
            </a>
          </span>
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12 col-md-4 text-center',
          <button className="btn rounded-button rounded-button--secondary"
            type="button" onClick={previousPage}>Go Back</button>
        ),
        fields.createColumn('col-sm-12 col-md-4 text-center',
          <button className={'btn sd-form__nav-button rounded-button ' +
            'success button'} type="submit"
            disabled={pristine || submitting}>Apply!</button>
        )
      )}

      {submitError && fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createError(submitError.message)
        )
      )}
    </form>);
  }
};

export default reduxForm({
  form: 'apply',
  destroyOnUnmount: false,
  validate
})(UserSection);
