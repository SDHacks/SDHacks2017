import {Field, reduxForm} from 'redux-form';
import React from 'react';
import PropTypes from 'prop-types';

import fields from './Fields';
import validate from './validate';

class ResponseSection extends React.Component {
  static propTypes = {
    previousPage: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  createAcceptBox() {
    return (<Field component='input' type='checkbox'
      className='sd-form__input-checkbox' name='accept' />);
  }

  render() {
    const {previousPage, handleSubmit, pristine, submitting} = this.props;
    return (<form onSubmit={handleSubmit}>
      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('What kind of food would you like to see ' +
            'at the hackathon?', false),
          fields.createTextArea('food', 'Healthy Snacks and Drinks')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('Dietary Restrictions', false),
          fields.createTextArea('diet', 'Dietary Restrictions')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('I will be travelling from outside the '+
              'San Diego county'),
          fields.createRadio('outOfState', true, 'Yes'),
          fields.createRadio('outOfState', false, 'No')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-lg-6',
          fields.createLabel('If yes, from where?', false),
          fields.createInput('city', 'Which city?')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-lg-6',
          fields.createLabel('T-Shirt Fit'),
          <br/>,
          fields.createRadio('shirtFit', 'M', 'Men\'s'),
          fields.createRadio('shirtFit', 'W', 'Women\'s')
        ),
        fields.createColumn('col-lg-6',
          fields.createLabel('T-Shirt Size'),
          fields.createTShirtSizePicker()
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('This will be my first hackathon'),
          fields.createRadio('firstHackathon', true, 'Yes'),
          fields.createRadio('firstHackathon', false, 'No')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('What do you hope to get out of attending the ' +
            'hackathon? 500 characters or less'),
          fields.createTextArea('outcomeStmt', 'Your outcome', 500)
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('Please enter the email addresses of your '+
            'desired teammates. We will do our best to accept whole teams if '+
            'ALL members apply and include all members’ email addresses in '+
            'their applications. Don’t worry, you can come back and edit your '+
            'application at any time.', false)
        ),
        fields.createColumn('col-sm-12 col-lg-4',
          fields.createInput('team1', 'example@example.com', 'email')
        ),
        fields.createColumn('col-sm-12 col-lg-4',
          fields.createInput('team2', 'example@example.com', 'email')
        ),
        fields.createColumn('col-sm-12 col-lg-4',
          fields.createInput('team3', 'example@example.com', 'email')
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          fields.createLabel('We participate in Major League Hacking (MLH) as '+
          'a MLH Member Event. You authorize us to share certain '+
          'application/registration information for event administration, '+
          'ranking, MLH administration, pre and post-event informational '+
          'e-mails, and occasional messages about hackathons in line with the '+
          'MLH Privacy Policy.')
        ),
        fields.createColumn('col-sm-12',
          this.createAcceptBox(),
          <span>I accept the&nbsp;
          <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code
          of Conduct</a></span>
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12 text-center',
          <button className={'btn sd-form__nav-button rounded-button ' +
            'success button'} type="submit"
            disabled={pristine || submitting}>Apply!</button>
        )
      )}

      {fields.createRow(
        fields.createColumn('col-sm-12',
          <button className="btn btn-secondary" type="button"
            onClick={previousPage}>Go Back</button>
        )
      )}
    </form>);
  }
}

export default reduxForm({
  form: 'apply',
  destroyOnUnmount: false,
  validate
})(ResponseSection);
