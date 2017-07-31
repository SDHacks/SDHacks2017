import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

const URL_PREFIX = '/user/auth';

const prefix = pref(URL_PREFIX);

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
