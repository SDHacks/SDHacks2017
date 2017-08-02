import userColumns from
  '~/components/apps/Admin/pages/UsersPage/reducers/Columns';

import users from '~/components/apps/Admin/pages/UsersPage/reducers/Users';

import auth from '~/components/apps/Admin/auth/reducers/Auth';

import dashboardStats from
  '~/components/apps/Admin/pages/DashboardPage/reducers/Stats';

import admins from '~/components/apps/Admin/pages/AdminsPage/reducers/Admins';

import resumes from
  '~/components/apps/Admin/pages/ResumesPage/reducers/Resumes';

import filters from
  '~/components/apps/Admin/reducers/Filters';

export default {
  auth,
  admins,
  filters,
  userColumns: userColumns,
  users,
  resumes,
  dashboardStats,
};
