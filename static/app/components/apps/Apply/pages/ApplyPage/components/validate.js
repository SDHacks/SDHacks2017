/**
 * Validates the form data for correctness.
 * @param {Object} values The unvalidated form data.
 * @returns {(Object|undefined)} An error object where the key represents the
 * name of the form property, and the value its error.
 */
const validate = values => {
  const errors = {};

  const required = ['firstName', 'lastName', 'email', 'birthdateDay',
    'birthdateMonth', 'birthdateYear', 'gender', 'phone', 'institution',
    'major', 'year', 'resume', 'outOfState', 'shirtFit', 'shirtSize',
    'firstHackathon', 'outcomeStmt', 'accept'
  ];

  const notValid = required.filter(name => !(name in values));
  notValid.forEach(name => errors[name] = 'Required');

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.birthdateDay < 1 || values.birthdateDay > 31) {
    errors.birthdateDay = 'Invalid Day';
  }
  if (values.birthdateMonth < 1 || values.birthdateMonth > 12) {
    errors.birthdateMonth = 'Invalid Month';
  }
  if (values.birthdateYear < 1900 || values.birthdateYear > 1999) {
    errors.birthdateYear = 'Invalid Year';
  }

  if (values.institution === 'uni' && !values.university) {
    errors.university = 'Required';
  }

  if (values.institution === 'hs' && !values.highSchool) {
    errors.highSchool = 'Required';
  }

  if (values.year < 2017) {
    errors.year = 'Applicants must be current students';
  }

  if (values.outOfState && values.outOfState === 'true' && !values.city) {
    errors.city = 'Required';
  }

  return errors;
};

export default validate;
