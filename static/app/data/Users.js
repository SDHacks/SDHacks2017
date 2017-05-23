const URL_PREFIX = '/admin/api';

import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

const prefix = pref(URL_PREFIX);
const cookies = new Cookies();

export const loadAllUsers = () => {
  return request
      .get('/users')
      .set('Authorization', cookies.get('token', {path: '/'}))
      .use(prefix)
      .use(nocache);
};
