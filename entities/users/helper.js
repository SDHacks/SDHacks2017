/**
 * Reduces a user object down into public information.
 * @param {Object} request A full user's information.
 * @returns {Object} A formatted user for public consumption.
 */
function setUserInfo(request) {
  return {
    _id: request._id,
    username: request.username
  };
};

module.exports = {
  setUserInfo
};
