import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

const URL_PREFIX = '/admin/api';

const prefix = pref(URL_PREFIX);
const cookies = new Cookies();

export const loadAllUsers = () => {
  return request
      .get('/users')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix)
      .use(nocache);
};

export const loadStats = () => {
  return request
      .get('/stats')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix);
};
