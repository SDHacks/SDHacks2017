/* eslint-disable react/prop-types */
import {Field} from 'redux-form';
import {Alert} from 'reactstrap';
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

creates.createError = function createError(text) {
  return (<Alert color="danger" className="sd-form__error">
    <strong><i className="fa fa-exclamation-triangle"></i> </strong>
    {text}
  </Alert>);
};

creates.errorTextInput =
  function errorTextInput({input, className, placeholder, type,
    meta: {touched, error}}) {
    return (
      <div>
        <input {...input} className={className} placeholder={placeholder}
          type={type} />
        {touched && error && creates.createError(error)}
      </div>);
  };

creates.errorRadio =
  function errorRadio({input, className, label, defaultVal}) {
    return (
      <div className='form-check form-check-inline'>
        <label className='form-check-label'>
          <input {...input} className={className} type="radio"
            value={defaultVal} checked={input.value === defaultVal} />
          {label}
        </label>
      </div>);
  };

creates.errorTextArea =
  function errorTextArea({input, className, placeholder, maxLength,
    meta: {touched, error}}) {
    return (
      <div>
        <textarea {...input} className={className} placeholder={placeholder}
          maxLength={maxLength} />
        {touched && error && creates.createError(error)}
      </div>);
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
            <option key={i} value={(i+1) < 10 ? '0' + (i+1) : (i+1)}>
              {month}
            </option>)}
        </select>
        {touched && error && creates.createError(error)}
      </div>);
  };

creates.errorTShirtSizePicker =
  function errorTShirtSizePicker({input, className, type,
    meta: {touched, error}}) {
    let sizes = [
      'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'
    ];
    let values = [
      'XS', 'S', 'M', 'L', 'XL', 'XXL'
    ];

    return (
      <div>
        <select {...input} className={className}
          type={type}>
          <option key={-1}></option>
          {sizes.map((size, i) =>
            <option key={i} value={values[i]}>{size}</option>)}
        </select>
        {touched && error && creates.createError(error)}
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
        {touched && error && creates.createError(error)}
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

creates.createTextArea = function createTextArea(name, placeholder,
  maxLength=null, className='sd-form__input-textarea') {
  return (<Field className={className} name={name} maxLength={maxLength}
    component={creates.errorTextArea} placeholder={placeholder} />);
};

creates.createMonthPicker = function createMonthPicker() {
  return (<Field component={creates.errorMonthPicker}
    className="sd-form__input-select mb-1 mb-md-0" name="birthdateMonth" />);
};

creates.createGenderPicker = function createGenderPicker() {
  return (<Field component={creates.errorGenderPicker}
    className="sd-form__input-select" name="gender" />);
};

creates.createTShirtSizePicker = function createTShirtSizePicker() {
  return (<Field component={creates.errorTShirtSizePicker}
    className="sd-form__input-select" name="shirtSize" />);
};

creates.createRadio = function createRadio(name, value, label,
  className='sd-form__input-radio form-check-input') {
  return (<Field component={creates.errorRadio} className={className}
    name={name} defaultVal={String(value)} label={label} />);
};

export default creates;
