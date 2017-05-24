const Roles = {
  ROLE_DEVELOPER: 'Developer',
  ROLE_ADMIN: 'Admin',
  ROLE_SPONSOR: 'Sponsor',
  ROLE_MEMBER: 'Member'
};

function getRole(checkRole) {
  var role;

  switch (checkRole) {
  case Roles.ROLE_DEVELOPER: role = 4; break;
  case Roles.ROLE_ADMIN: role = 3; break;
  case Roles.ROLE_SPONSOR: role = 2; break;
  case Roles.ROLE_MEMBER: role = 1; break;
  default: role = 1;
  }

  return role;
};

module.exports = {
  Roles,
  getRole
};
