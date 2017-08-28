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
import UserProfile from
  '~/components/apps/User/pages/UserPage/components/UserProfile';

const exampleUser = {
  "_id": "598348934f0f5afe6a8371b9",
  "deletedAt": null,
  "deleted": false,
  "createdAt": "2017-08-03T16:00:20.856Z",
  "updatedAt":  "2017-08-03T16:00:20.856Z",
  "shirtSize": "M",
  "website": "https://rdbk.tv/",
  "github": "RedbackThomson",
  "year": "3",
  "university": "The University of California, San Diego",
  "phone": 5555555555,
  "email": "example@email.com",
  "gender": "Male",
  "birthdate": "1997-12-25T00:00:00.000Z",
  "lastName": "Thomson",
  "firstName": "Nicholas",
  "password": "abc123",
  "username": "admin",
  "resume": {
      "size": 246951,
      "name": "example.pdf",
      "type": "application/pdf",
      "url": "https://example.com/example.pdf"
  },
  "checkedIn": true,
  "confirmed": true,
  "teammates": [
    "teammate1@email.com",
    "teammate2@email.com",
    "teammate3@email.com"
  ],
  "bussing": false,
  "travel": {
      "outOfState": false
  },
  "shareResume": true,
  "categories": [],
  "major": "Computer Science",
  "__v": 0
}

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
      errorMessage={text('Error', null)}
      alerts={[]} />
  ))
;

storiesOf('User Panel', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/user']}>{story()}</MemoryRouter>
  ))
  .addDecorator(story => (
    <Provider store={Store}>
      {story()}
    </Provider>
  ))
  .addDecorator(story => (
    <div className="user-page">
      <div className="hexagon-hero__background user-page__background">
        <div className="hexagon-hero__water"></div>
        <div className="hexagon-hero__beach"></div>
      </div>
      <div className="user-page__above">
        <div className="user-page__header">
          <a href="/">
            <img className="user-page__logo"
              src="/assets/img/vectors/logo.svg"/>
          </a>
          <span className="user-page__header-text">
            Your Application
          </span>
        </div>
      </div>

      <div className="user-page__container container">
        {story()}
      </div>
    </div>
  ))
  .add('Page', () => (
    <UserProfile user={object('User', exampleUser)} />
  ))
;