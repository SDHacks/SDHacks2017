import userColumns from
  '~/components/apps/Admin/pages/UsersPage/reducers/Columns';

import users from '~/components/apps/Admin/pages/UsersPage/reducers/Users';

import auth from '~/components/apps/Admin/auth/reducers/Auth';

import dashboardStats from
  '~/components/apps/Admin/pages/DashboardPage/reducers/Stats';

import admins from '~/components/apps/Admin/pages/AdminsPage/reducers/Admins';

import resumes from
  '~/components/apps/Admin/pages/ResumesPage/reducers/Resumes';

export default {
  auth,
  admins,
  userColumns: userColumns,
  users,
  resumes,
  dashboardStats,
};
