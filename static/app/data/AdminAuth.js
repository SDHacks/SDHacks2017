import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

const URL_PREFIX = '/admin/auth';

const prefix = pref(URL_PREFIX);

export const loadProtected = () => {
  return request
      .get('/protected')
      .use(prefix)
      .use(nocache);
};

export const login = (username, password) => {
  return request
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({username, password})
      .use(prefix)
      .use(nocache);
};

export const register = (username, password) => {
  return request
      .post('/register')
      .set('Content-Type', 'application/json')
      .send({username, password})
      .use(prefix)
      .use(nocache);
};
