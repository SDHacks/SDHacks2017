import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number, select, object} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';

import AdminList from '~/components/apps/Admin/pages/AdminsPage/components/AdminList';
import RegisterModal from '~/components/apps/Admin/pages/AdminsPage/components/RegisterModal';

const mockAdminList = [{
    "_id": "592757e482a45724228eb76d",
    "username": "sponsor",
    "role": "Sponsor",
    "createdAt": "2017-05-25T22:17:09.004Z",
    "deleted": false,
    "deletedAt": null
  }, {
    "_id": "592273869fb3d0a433bbbc33",
    "username": "admin",
    "role": "Developer",
    "createdAt": "2017-05-22T05:13:42.108Z",
    "deleted": false,
    "deletedAt": null,
    "lastAccessed": "2017-08-26T02:47:09.387Z"
}];

storiesOf('Administrator Panel/Admins', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/admins']}>{story()}</MemoryRouter>
  ))
  .add('Admin List', () => 
    <AdminList admins={object('Admins', mockAdminList)} />
  )
  .add('Register Modal', () =>
    <RegisterModal open toggle={action('Toggle Register')} onSubmit={action('Submitted')} />
  )
;