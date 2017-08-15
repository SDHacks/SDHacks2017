import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

import CookieTypes from '~/static/Cookies';

const URL_PREFIX = '/user';

const prefix = pref(URL_PREFIX);
const cookies = new Cookies();

/**
 * Log in as a user.
 * @param  {String} username The username of the login.
 * @param  {String} password The password of the login.
 * @returns {Promise} A promise of the request.
 */
export const login = (username, password) => {
  return request
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({username, password})
      .use(prefix)
      .use(nocache);
};

/**
 * Get the information about the current user.
 * @returns {Promise} A promise of the request
 */
export const getCurrentUser = () => {
  return request
      .get('/api/current')
      .set('Content-Type', 'application/json')
      .set('Authorization', cookies.get(CookieTypes.user.token, {path: '/'}))
      .use(prefix)
      .use(nocache);
};
