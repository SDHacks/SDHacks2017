const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.birthdateDay) {
    errors.birthdateDay = 'Required';
  }
  if (!values.birthdateMonth) {
    errors.birthdateMonth = 'Required';
  } else if (values.birthdateMonth < 1 || values.birthdateMonth > 12) {
    errors.birthdateMonth = 'Invalid Month';
  }
  if (!values.birthdateYear) {
    errors.birthdateYear = 'Required';
  } else if (values.birthdateYear < 1900 || values.birthdateYear > 2010) {
    errors.birthdateYear = 'Invalid Year';
  }

  if (!values.gender) {
    errors.gender = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  }

  if (!values.institution) {
    errors.institution = 'Required';
  } else {
    if (values.institution === 'uni' && !values.university) {
      errors.university = 'Required';
    }

    if (values.institution === 'hs' && !values.highSchool) {
      errors.highSchool = 'Required';
    }
  }

  if (!values.major) {
    errors.major = 'Required';
  }

  if (!values.year) {
    errors.year = 'Required';
  } else if (values.year < 2017) {
    errors.year = 'Applicants must be current students';
  }

  if (!values.resume) {
    errors.resume = 'Required';
  }

  return errors;
};

export default validate;
