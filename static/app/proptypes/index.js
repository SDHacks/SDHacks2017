import PropTypes from 'prop-types';

export const Column = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  default: PropTypes.string,
  prefix: PropTypes.string,
  link: PropTypes.string,
  sort: PropTypes.bool,
  key: PropTypes.bool
};

export const Admin = {
  _id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};

export const Applicants = {
  university: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  year: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export const Resumes = {
  applicants: PropTypes.arrayOf(PropTypes.shape(
    module.exports.Applicants).isRequired).isRequired
};

export const User = {
  _id: PropTypes.string.isRequired,
  deletedAt: PropTypes.string,
  deleted: PropTypes.bool,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  outcomeStmt: PropTypes.string.isRequired,
  firstHackathon: PropTypes.bool.isRequired,
  shirtSize: PropTypes.string.isRequired,
  diet: PropTypes.string,
  food: PropTypes.string,
  website: PropTypes.string,
  github: PropTypes.string,
  year: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  resume: PropTypes.shape({
    size: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string
  }),
  checkedIn: PropTypes.bool,
  confirmed: PropTypes.bool.isRequired,
  teammates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  bussing: PropTypes.bool,
  travel: PropTypes.shape({
    outOfState: PropTypes.bool.isRequired,
    city: PropTypes.string
  }).isRequired,
  shareResume: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  majors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
