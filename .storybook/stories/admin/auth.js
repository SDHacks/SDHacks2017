import React from 'react';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';

import Store from '../redux-middleware';

import Sidebar from '~/components/apps/Admin/layouts/components/AdminSidebar';
import Login from '~/components/apps/Admin/auth/Login';

storiesOf('Administrator Panel/Authentication', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/admin']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => (
    <Provider store={Store}>
      {story()}
    </Provider>
  ))
  .addDecorator(story => (
    <div className="admin-body d-flex flex-column">
      <div className="container-fluid p-0 w-100 h-100">
        <div className="d-flex flex-column flex-md-row h-100">
          <div className={`admin-sidebar__container 
            admin-sidebar__container--logged-out`}>
            <Sidebar isEditing={false} isAuthenticated={false}
              onEditChange={action('Change edit')}>
              {story()}
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  ))
  .add('Login', () => (
    <Login loginUser={action('Login attempted')} />
  ))
  .add('Login with Error', () => (
    <Login loginUser={action('Login attempted')}
      errorMessage={text('errorMessage', 'Invalid Username or Password')} />
  ))
;