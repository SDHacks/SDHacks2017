const URL_PREFIX = '/admin/api';

import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

const prefix = pref(URL_PREFIX);

export const loadAllUsers = () => {
  return request
      .get('/users')
      .use(prefix)
      .use(nocache);
};
