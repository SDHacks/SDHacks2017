import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number, select} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';

import {Roles} from '~/static/Roles';
import Sidebar from '~/components/apps/Admin/layouts/components/AdminSidebar';

let mockUsers = {
  member: {
    username: text('Username', 'Redback'),
    role: Roles.ROLE_MEMBER
  },
  sponsor: {
    username: text('Username', 'Redback'),
    role: Roles.ROLE_SPONSOR
  },
  admin: {
    username: text('Username', 'Redback'),
    role: Roles.ROLE_ADMIN
  },
  developer: {
    username: text('Username', 'Redback'),
    role: Roles.ROLE_DEVELOPER
  }
};

let roles = {};
Object.values(Roles).forEach(role => roles[role] = role);

storiesOf('Administrator Panel/Layout', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/dashboard']}>{story()}</MemoryRouter>
  ))
  .add('Overall', 
    withInfo('Roles: Developer, Admin, Sponsor and Member')(() => (
      <div className="admin-body d-flex flex-column">

        <div className="container-fluid p-0 w-100 h-100">
          <div className="d-flex flex-column flex-md-row h-100">
            <div className={`admin-sidebar__container 
              admin-sidebar__container--authenticated`}>
              <Sidebar isEditing={boolean('isEditing', false)}
                isAuthenticated
                user={{
                  username: text('Username', 'Redback'),
                  role: select('Role', roles, Roles.ROLE_DEVELOPER)
                }} onEditChange={action('Change edit')} />
            </div>

            <main style={{flex: 1}} className="p-3">
              {text('Content', 'Hello World')}
            </main>
          </div>
        </div>
      </div>
    )))
;

storiesOf('Administrator Panel/Sidebar', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/']}>{story()}</MemoryRouter>
  ))
  .add('Logged Out Sidebar', () => (
    <div className={`admin-sidebar__container
      admin-sidebar__container--logged-out`}>
      <Sidebar isAuthenticated={false} onEditChange={action('Change edit')}>
        {text('Content', 'Hello World')}
      </Sidebar>
    </div>
  ))
  .add('Member Sidebar', () => (
    <div className={`admin-sidebar__container
      admin-sidebar__container--authenticated`}>
      <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
        user={{
          username: text('Username', 'Redback'),
          role: Roles.ROLE_MEMBER
        }} onEditChange={action('Change edit')} />
    </div>
  ))
  .add('Sponsor Sidebar', () => (
    <div className={`admin-sidebar__container
      admin-sidebar__container--authenticated`}>
      <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
        user={{
          username: text('Username', 'Redback'),
          role: Roles.ROLE_SPONSOR
        }} onEditChange={action('Change edit')} />
    </div>
  ))
  .add('Admin Sidebar', () => (
    <div className={`admin-sidebar__container
      admin-sidebar__container--authenticated`}>
      <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
        user={{
          username: text('Username', 'Redback'),
          role: Roles.ROLE_ADMIN
        }} onEditChange={action('Change edit')} />
    </div>
  ))
  .add('Developer Sidebar', () => (
    <div className={`admin-sidebar__container
      admin-sidebar__container--authenticated`}>
      <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
        user={{
          username: text('Username', 'Redback'),
          role: Roles.ROLE_DEVELOPER
        }} onEditChange={action('Change edit')} />
    </div>
  ))
;