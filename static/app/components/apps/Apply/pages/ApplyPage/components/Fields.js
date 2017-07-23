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

creates.errorTextInput =
  function errorTextInput({input, className, placeholder, type,
    meta: {touched, error}}) {
    return (
      <div>
        <input {...input} className={className} placeholder={placeholder}
          type={type} />
        {touched && error && <span>{error}</span>}
      </div>);
  };

creates.createLabel = function createLabel(text, required=true, className='') {
  return (<label className={required ? 'sd-form__required ' +
    className : className}>{text}</label>);
};

creates.createInput = function createInput(name, placeholder, type='text',
  className='sd-form__input-text', normalize=null) {
  return (<Field className={className}
    name={name} component={creates.errorTextInput} placeholder={placeholder}
    type={type} normalize={normalize} />);
};

creates.errorMonthPicker =
  function errorMonthPicker({input, className, type,
    meta: {touched, error}}) {
    let months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    return (
      <div>
        <select {...input} className={className}
          type={type}>
          <option key={-1}>Month</option>
          {months.map((month, i) =>
            <option key={i} value={i+1}>{month}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
      </div>);
  };

creates.errorGenderPicker =
  function errorGenderPicker({input, className, type,
    meta: {touched, error}}) {
    let genders = [
      'Male', 'Female', 'Non-Binary', 'I prefer not to say', 'Other'
    ];

    return (
      <div>
        <select {...input} className={className}
          type={type}>
          <option key={-1}></option>
          {genders.map((gender, i) =>
            <option key={i} value={gender}>{gender}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
      </div>);
  };

creates.createMonthPicker = function createMonthPicker() {
  return (<Field component={creates.errorMonthPicker} className="sd-form__input-select"
    name="birthdateMonth" />);
};

creates.createGenderPicker = function createGenderPicker() {
  return (<Field component={creates.errorGenderPicker}
    className="sd-form__input-select" name="gender" />);
};

export default creates;
