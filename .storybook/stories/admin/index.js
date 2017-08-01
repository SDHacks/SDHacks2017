import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
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

storiesOf('Administrator Panel/Layout', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/dashboard']}>{story()}</MemoryRouter>
  ))
  .add('Top Navbar', () => (
    <Nav />
  ))
  .add('Overall', 
    withInfo('Roles: Developer, Admin, Sponsor and Member')(() => (
      <div className="admin-body d-flex flex-column">

        <div className="container-fluid p-0 w-100 h-100">
          <div className="d-flex flex-column flex-md-row h-100">
            <div className="admin-sidebar__container">
              <Sidebar isEditing={boolean('isEditing', false)}
                isAuthenticated={boolean('isAuthenticated', true)}
                user={{
                  username: text('Username', 'Redback'),
                  role: text('Role', 'Developer')
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
    <Sidebar isAuthenticated={false}>Hello Button</Sidebar>
  ))
  .add('Member Sidebar', () => (
    <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
      user={mockUsers.member}>Hello Button</Sidebar>
  ))
  .add('Sponsor Sidebar', () => (
    <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
      user={mockUsers.sponsor}>Hello Button</Sidebar>
  ))
  .add('Admin Sidebar', () => (
    <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
      user={mockUsers.admin}>Hello Button</Sidebar>
  ))
  .add('Developer Sidebar', () => (
    <Sidebar isAuthenticated isEditing={boolean('isEditing', false)}
      user={mockUsers.developer}>Hello Button</Sidebar>
  ))
;