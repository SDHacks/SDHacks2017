import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number, select} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';

import ColumnEditor from '~/components/apps/Admin/pages/UsersPage/components/ColumnEditor';

const mockColumns = [
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  },
  {
    Header: 'Github',
    accessor: 'github'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Major',
    accessor: 'major'
  }
];

storiesOf('Administrator Panel/Users', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin/users']}>{story()}</MemoryRouter>
  ))
  .add('Column Editor', () => 
    <ColumnEditor columns={mockColumns} onAddColumn={action('Added Column')} />
  )
;