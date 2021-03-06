import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

import {promisify} from './helpers';

import CookieTypes from '~/static/Cookies';

const ADMIN_URL_PREFIX = '/admin/api';

const adminPrefix = pref(ADMIN_URL_PREFIX);
const cookies = new Cookies();

/**
 * Request a list of all users.
 * @returns {Promise} A promise of the request.
 */
export const loadAllUsers = () =>
  promisify(request
      .get('/users')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request a list of all admins.
 * @returns {Promise} A promise of the request.
 */
export const loadAllAdmins = () =>
  promisify(request
      .get('/admins')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix)
      .use(nocache));

/**
 * Request a list of all applicants.
 * @returns {Promise} A promise of the request.
 */
export const loadAllApplicants = () =>
  promisify(request
      .get('/sponsors/applicants')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix)
      .use(nocache));

/**
 * Request the statistics for users.
 * @returns {Promise} A promise of the request.
 */
export const loadUserStats = () =>
  promisify(request
      .get('/stats/users')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request the statistics for universities.
 * @returns {Promise} A promise of the request.
 */
export const loadUniversityStats = () =>
  promisify(request
      .get('/stats/university')
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request information about a given user.
 * @param  {String} id The ID of the requested user.
 * @returns {Promise} A promise of the request.
 */
export const loadUser = (id) =>
  promisify(request
      .get('/users/' + id)
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request an update for a given user.
 * @param  {String} id The ID of the user.
 * @param  {Object} user The new user object to save.
 * @returns {Promise} A promise of the request.
 */
export const updateUser = (id, user) =>
  promisify(request
      .post('/users/' + id)
      .send(user)
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request a user marked as checked in.
 * @param  {String} email The email of the user.
 * @returns {Promise} A promise of the request.
 */
export const checkinUser = (email) =>
promisify(request
    .post('/users/checkin')
    .send({email})
    .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
    .use(adminPrefix));

/**
 * Request to register a new user.
 * @param  {Object} user The user fields to register.
 * @returns {Promise} A promise of the request.
 */
export const registerUser = (user) =>
  promisify(request
      .post('/apply/api/register')
      .field(user)
      .attach('resume', user.resume[0]));

/**
 * Request to register a new admin.
 * @param {Object} admin The admin fields to register.
 * @returns {Promise} A promise of the request.
 */
export const registerAdmin = (admin) =>
  promisify(request
      .post('/admins/register')
      .send(admin)
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request to delete a new admin.
 * @param {String} adminId The ID of the admin to delete.
 * @returns {Promise} A promise of the request.
 */
export const deleteAdmin = (adminId) =>
  promisify(request
      .post('/admins/delete')
      .send({id: adminId})
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Request to download a given set of resumes.
 * @param {String[]} applicants An array of User IDs to download
 * @returns {Promise} A promise of the request.
 */
export const downloadResumes = (applicants) =>
  promisify(request
      .post('/sponsors/applicants/download')
      .send({applicants})
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));

/**
 * Requests the status of an ongoing download.
 * @param {String} downloadId The given ID of the download.
 * @returns {Promise} A promise of the request.
 */
export const pollDownload = (downloadId) =>
    promisify(request
      .get('/sponsors/applicants/download/' + downloadId)
      .set('Authorization', cookies.get(CookieTypes.admin.token, {path: '/'}))
      .use(adminPrefix));
