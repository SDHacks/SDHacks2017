import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number, select, 
  array} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';

import {Roles} from '~/static/Roles';
import Sidebar from '~/components/apps/Admin/layouts/components/SponsorSidebar';

let mockUsers = {
  member: {
    username: text('Username', 'Facetweet'),
    role: Roles.ROLE_MEMBER
  },
  sponsor: {
    username: text('Username', 'Facetweet'),
    role: Roles.ROLE_SPONSOR
  },
  admin: {
    username: text('Username', 'Facetweet'),
    role: Roles.ROLE_ADMIN
  },
  developer: {
    username: text('Username', 'Facetweet'),
    role: Roles.ROLE_DEVELOPER
  }
};

let roles = {};
Object.values(Roles).forEach(role => roles[role] = role);

storiesOf('Resume Tool/Layout', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/dashboard']}>{story()}</MemoryRouter>
  ))
  .add('Overall', () => (
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
    ))
;

storiesOf('Resume Tool/Sidebar', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/']}>{story()}</MemoryRouter>
  ))
  .add('Sponsor View', () => (
    <Sidebar user={mockUsers.sponsor} selected={number('Selected', 672)}
      total={number('Total', 3367)} toggleFilter={console.log}
      toggleFilterOption={console.log} />
  ))
;