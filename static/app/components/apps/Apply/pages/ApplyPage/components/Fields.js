import {Field} from 'redux-form';
import React from 'react';

let creates = {};

creates.createRow = function createRow(...content) {
  return (<div className='row sd-form__row'>
    {content}
  </div>);
};

creates.createColumn = function createColumn(size, ...content) {
  return (<div className={size}>
    {content}
  </div>);
};

creates.createLabel = function createLabel(text, required=true, className='') {
  return (<label className={required ? 'sd-form__required ' +
    className : className}>{text}</label>);
};

creates.createInput = function createInput(name, placeholder, type='text',
  className='sd-form__input-text', normalize=null) {
  return (<Field className={className}
    name={name} component="input" placeholder={placeholder} type={type}
    normalize={normalize} />);
};

creates.createMonthPicker = function createMonthPicker() {
  let months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (<Field component="select" className="sd-form__input-select"
    name="birthdate_month">
    <option>Month</option>
    {months.map((month, i) => <option value={i+1}>{month}</option>)}
  </Field>);
};

creates.createGenderPicker = function createGenderPicker() {
  let genders = [
    'Male', 'Female', 'Non-Binary', 'I prefer not to say', 'Other'
  ];

  return (<Field component="select" className="sd-form__input-select"
    name="gender">
    <option></option>
    {genders.map((gender) => <option value={gender}>{gender}</option>)}
  </Field>);
};

creates.createInstitutionCard =
  function createInstitutionCard(value, id, label) {
    return (<div className="sd-form__institution-card">
      <Field component="input" type="radio" value={value} name='institution'
        id={id} className="sd-form__input-radio sd-form__institution-radio" />
      {this.createLabel(label, false, 'sd-form__institution-label')}
    </div>);
  };

export default creates;
