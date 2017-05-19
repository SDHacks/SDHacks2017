const roles = {
  ROLE_DEVELOPER: 'Developer',
  ROLE_ADMIN: 'Admin',
  ROLE_SPONSOR: 'Sponsor',
  ROLE_MEMBER: 'Member'
};

exports.roles = roles;

// Authentication Helper
exports.setUserInfo = function(request) {
  return {
    _id: request._id,
    username: request.username,
    role: request.role,
  };
};

exports.roleAuth = function(req, res, next) {
  const user = req.user;

  Admin.findById(user._id, function(err, foundAdmin) {
    if (err) {
      res.status(422).json({error: 'No user was found.'});
      return next(err);
    }

    // If admin is found, check role.
    if (foundAdmin.role === role) {
      return next();
    }

    res.status(401).json({
      error: 'You are not authorized to view this content.'
    });
    return next('Unauthorized');
  });
};

exports.getRole = function getRole(checkRole) {
  var role;

  switch (checkRole) {
  case roles.ROLE_DEVELOPER: role = 4; break;
  case roles.ROLE_ADMIN: role = 3; break;
  case roles.ROLE_SPONSOR: role = 2; break;
  case roles.ROLE_MEMBER: role = 1; break;
  default: role = 1;
  }

  return role;
};
