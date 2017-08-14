import userColumns from
  '~/components/apps/Admin/pages/UsersPage/reducers/Columns';

import users from '~/components/apps/Admin/pages/UsersPage/reducers/Users';

import auth from '~/components/apps/Admin/auth/reducers/Auth';

import dashboardStats from
  '~/components/apps/Admin/pages/DashboardPage/reducers/Stats';

import admins from '~/components/apps/Admin/pages/AdminsPage/reducers/Admins';

import resumes from
  '~/components/apps/Admin/pages/ResumesPage/reducers/Resumes';

import filters from '~/components/apps/Admin/reducers/Filters';

import general from '~/components/apps/Admin/reducers/General';

export default {
  auth,
  admins,
  filters,
  general,
  userColumns,
  users,
  resumes,
  dashboardStats,
};
