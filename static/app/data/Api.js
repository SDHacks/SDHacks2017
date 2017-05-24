import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';
import Q from 'q';

const URL_PREFIX = '/admin/api';

const prefix = pref(URL_PREFIX);
const cookies = new Cookies();

const promisify = (request) => {
  var deferred = Q.defer();
  request.end((err, res) => {
    if (err || res.body.error) {
      return deferred.reject(err || res.body.error);
    }
    deferred.resolve(res.body);
  });
  return deferred.promise;
};

export const loadAllUsers = () =>
  promisify(request
      .get('/users')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix)
      .use(nocache));

export const loadStats = () =>
  promisify(request
      .get('/stats')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix));
