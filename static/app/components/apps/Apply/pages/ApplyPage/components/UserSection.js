import {reduxForm} from 'redux-form';
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

  render() {
    const {previousPage, handleSubmit, pristine, submitting, submitError} =
      this.props;
    return (<form onSubmit={handleSubmit}>
      {fields.createRow(
        fields.createColumn('col-sm-12',
          <h4>Create an account</h4>
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
