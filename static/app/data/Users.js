const URL_PREFIX = '/admin';

import nocache from 'superagent-no-cache';
import request from 'superagent';
import pref from 'superagent-prefix';

const prefix = pref(URL_PREFIX);

export const loadAllUsers = () => {
  return request
      .get('/users')
      .use(prefix)
      .use(nocache);
};
