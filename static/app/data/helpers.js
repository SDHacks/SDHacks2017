import Q from 'q';

/**
 * Run a request and return a Q promise.
 * @param  {Object} request The superagent request to run.
 */
export const promisify = (request) => {
  var deferred = Q.defer();
  request.end((err, res) => {
    if (err || res.body.error) {
      if (res.body) {
        return deferred.reject(new Error(res.body.error));
      }
      if (err.status === 401) {
        return deferred.reject(new Error('Username or Password was incorrect. Have you confirmed your account?'));
      }
      return deferred.reject(new Error(err));
    }
    deferred.resolve(res.body);
  });
  return deferred.promise;
};
