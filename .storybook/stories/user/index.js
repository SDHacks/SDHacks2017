import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number, select, object,
  array} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';

import Store from '../redux-middleware';

import Login from '~/components/apps/User/pages/auth/Login';

storiesOf('User Panel', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/user/login']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => (
    <Provider store={Store}>
      {story()}
    </Provider>
  ))
  .add('Login', () => (
    <Login loginUser={action('Logged In')}
      handleSubmit={action('Form submitted')}
      errorMessage={text('Error', null)} />
    ))
;
