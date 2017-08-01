import React from 'react';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs} from '@storybook/addon-knobs'
import {withSmartKnobs} from 'storybook-addon-smart-knobs'
import {MemoryRouter} from 'react-router';
import {Provider} from 'react-redux';

import Store from '../redux-middleware';

import Header from '~/components/apps/Apply/pages/ApplyPage/components/Header';
import PersonalSection from '~/components/apps/Apply/pages/ApplyPage/components/PersonalSection';
import ResponseSection from '~/components/apps/Apply/pages/ApplyPage/components/ResponseSection';
import SubmittedSection from '~/components/apps/Apply/pages/ApplyPage/components/SubmittedSection';
import UserSection from '~/components/apps/Apply/pages/ApplyPage/components/UserSection';

storiesOf('Application Form', module)
  .addDecorator(withSmartKnobs)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <Provider store={Store}>
      <div className="sd-form__wrapper">
        <div className="sd-form">
          {story()}
        </div>
      </div>
    </Provider>
  ))
  .add('Form Header', () => (
    <Header />
  ))
  .add('Personal Section', () => (
    <PersonalSection onSubmit={action('Submitted')} reset={action('Reset')} />
  ))
  .add('Response Section', () => (
    <ResponseSection previousPage={action('Previous Page')} 
      onSubmit={action('Submitted')} reset={action('Reset')} />
  ))
  .add('User Section', () => (
    <UserSection previousPage={action('Previous Page')} 
      onSubmit={action('Submitted')} reset={action('Reset')} />
  ))
  .add('User Section With Error', () => (
    <UserSection previousPage={action('Previous Page')} 
      onSubmit={action('Submitted')} reset={action('Reset')} 
      submitError={{message: "That email has already been used."}} />
  ))
  .add('Submitted Section', () => (
    <SubmittedSection />
  ))
;