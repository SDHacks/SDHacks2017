import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';
import Q from 'q';

import CookieTypes from '~/static/Cookies';

const ADMIN_URL_PREFIX = '/admin/api';

const adminPrefix = pref(ADMIN_URL_PREFIX);
const cookies = new Cookies();


const promisify = (request) => {
  var deferred = Q.defer();
  request.end((err, res) => {
    if (err) {
      return deferred.reject(new Error(res.body.error || err));
    }
    deferred.resolve(res.body);
  });
  return deferred.promise;
};

export const loadAllUsers = () =>
  promisify(request
      .get('/users')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

export const loadAllAdmins = () =>
  promisify(request
      .get('/admins')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix)
      .use(nocache));

export const loadAllApplicants = () =>
  promisify(request
      .get('/sponsors/applicants')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix)
      .use(nocache));

export const loadUserStats = () =>
  promisify(request
      .get('/stats/users')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

export const loadUniversityStats = () =>
  promisify(request
      .get('/stats/university')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

export const loadUser = (id) =>
  promisify(request
      .get('/users/' + id)
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

export const updateUser = (id, user) =>
  promisify(request
      .post('/users/' + id)
      .send(user)
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

export const registerUser = (user) =>
  promisify(request
      .post('/apply/api/register')
      .send(user));
