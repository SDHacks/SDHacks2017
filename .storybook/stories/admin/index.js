import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';

import {Roles} from '~/static/Roles';
import Sidebar from '~/components/apps/Admin/layouts/admin/components/Sidebar';
import Nav from '~/components/apps/Admin/layouts/admin/components/Nav';

let mockUsers = {
  member: {
    username: "Redback",
    role: Roles.ROLE_MEMBER
  },
  sponsor: {
    role: Roles.ROLE_SPONSOR
  },
  admin: {
    role: Roles.ROLE_ADMIN
  },
  developer: {
    role: Roles.ROLE_DEVELOPER
  }
};

storiesOf('Administrator Panel', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Logged Out Sidebar', () => (
    <Sidebar authenticated={false}>Hello Button</Sidebar>
  ))
  .add('Member Sidebar', () => (
    <Sidebar authenticated user={mockUsers.member}>Hello Button</Sidebar>
  ))
  .add('Sponsor Sidebar', () => (
    <Sidebar authenticated user={mockUsers.sponsor}>Hello Button</Sidebar>
  ))
  .add('Admin Sidebar', () => (
    <Sidebar authenticated user={mockUsers.admin}>Hello Button</Sidebar>
  ))
  .add('Developer Sidebar', () => (
    <Sidebar authenticated user={mockUsers.developer}>Hello Button</Sidebar>
  ))
  .add('Top Navbar', () => (
    <Nav />
  ))
;