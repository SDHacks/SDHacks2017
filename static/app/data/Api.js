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
    if (err) {
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
      .use(prefix));

export const loadAllAdmins = () =>
  promisify(request
      .get('/admins')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix)
      .use(nocache));

export const loadAllApplicants = () =>
  promisify(request
      .get('/sponsors/applicants')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix)
      .use(nocache));

export const loadUserStats = () =>
  promisify(request
      .get('/stats/users')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix));

export const loadUniversityStats = () =>
  promisify(request
      .get('/stats/university')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix));

export const loadUser = (id) =>
  promisify(request
      .get('/users/' + id)
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix));
