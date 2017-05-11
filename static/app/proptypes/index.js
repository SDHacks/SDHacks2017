import PropTypes from 'prop-types';

export const Column = {
  default: PropTypes.string,
  prefix: PropTypes.string,
  link: PropTypes.string
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
  diet: PropTypes.string.isRequired,
  food: PropTypes.string,
  website: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  phone: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  resume: PropTypes.shape({
    size: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  checkedIn: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool.isRequired,
  teammates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  bussing: PropTypes.bool.isRequired,
  travel: PropTypes.shape({
    outOfState: PropTypes.bool.isRequired
  }).isRequired,
  shareResume: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  majors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
