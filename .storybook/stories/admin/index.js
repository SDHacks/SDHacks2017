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
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Top Navbar', () => (
    <Nav />
  ))
  .add('Overall', 
    withInfo('Roles: Developer, Admin, Sponsor and Member')(() => {
      return (<div className="admin-body">
        {/*Top bar navigation*/}
        <Nav toggleSidebar={action('Toggled Sidebar')}></Nav>

        <div className="container-fluid">
          {/*Sidebar navigation*/}
          <div className="row">
            <Sidebar authenticated={boolean('isAuthenticated', true)}
              isOpen={false} 
              user={{
                username: text('Username', 'Redback'),
                role: text('Role', 'Developer')
              }} />
          </div>

          <main className={'col-sm-9 offset-sm-3 col-md-8' +
            ' col-lg-10 offset-md-4 offset-lg-2 pt-3'}>
            {text('Content', 'Hello World')}
          </main>
        </div>
      </div>)
    }))
;

storiesOf('Administrator Panel/Sidebar', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/']}>{story()}</MemoryRouter>
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
;