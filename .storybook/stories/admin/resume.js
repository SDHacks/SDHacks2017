import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, text, boolean, number, select, object,
  array} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {MemoryRouter} from 'react-router';

import {Roles} from '~/static/Roles';
import Sidebar from '~/components/apps/Admin/layouts/components/SponsorSidebar';
import ResumeList from '~/components/apps/Admin/pages/ResumesPage/components/ResumeList';

let roles = {};
Object.values(Roles).forEach(role => roles[role] = role);

const mockFilterOptions = {
  github: ['redbackthomson', 'vincentliaw'],
  year: [2, 3]
};

const mockFilters = {
  'github': {
    displayName: 'Github',
    enabled: true,
    options: {
      'RedbackThomson': true
    }
  },
  'year': {
    displayName: 'Year',
    enabled: false,
    options: {}
  }
};

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
            <Sidebar user={{
              username: text('Username', 'Facetweet'),
              role: select('Role', roles, Roles.ROLE_SPONSOR),
              resume: {
                url: text('Resume.URL', 'example.com')
              },
              github: text('Github', 'RedbackThomson')
            }}
            selected={number('Selected', 672)}
            total={number('Total', 3367)}
            toggleFilter={action('Toggle Filter')}
            toggleFilterOption={action('Toggle Option')}
            selectAllOptions={action('Select All')}
            selectNoneOptions={action('Select None')}
            filters={object('Filters', mockFilters)}
            filterOptions={object('FilterOptions', mockFilterOptions)} />
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
    <Sidebar user={{
        username: text('Username', 'Facetweet'),
        role: select('Role', roles, Roles.ROLE_SPONSOR),
        resume: {
          url: text('Resume.URL', 'example.com')
        },
        github: text('Github', 'RedbackThomson')
      }}
      selected={number('Selected', 672)}
      total={number('Total', 3367)}
      toggleFilter={action('Toggle Filter')}
      toggleFilterOption={action('Toggle Option')}
      selectAllOptions={action('Select All')}
      selectNoneOptions={action('Select None')}
      filters={object('Filters', mockFilters)}
      filterOptions={object('FilterOptions', mockFilterOptions)} />
  ))
;

storiesOf('Resume Tool/List', module)
  .add('List', () => (
    <ResumeList
    onCompactChange={action('Compact Changed')}
    isCompacted={boolean('isCompacted', false)}
    applicants={[
      {
        firstName: 'Nicholas',
        lastName: 'Thomson',
        university: 'The University of California, San Diego',
        year: '3',
        gender: 'Male',
        status: 'Confirmed',
        resume: {
          url: 'example.com'
        }
      },
      {
        firstName: 'Vincent',
        lastName: 'Liaw',
        university: 'The University of California, San Diego',
        year: '3',
        gender: 'Male',
        status: 'Confirmed',
        resume: {
          url: 'example.com'
        }
      }
    ]}/>
  ))
  .add('List (Compacted)', () => (
    <ResumeList
    onCompactChange={action('Compact Changed')}
    isCompacted={boolean('isCompacted', true)}
    applicants={[
      {
        firstName: 'Nicholas',
        lastName: 'Thomson',
        university: 'The University of California, San Diego',
        year: '3',
        gender: 'Male',
        status: 'Confirmed',
        resume: {
          url: 'example.com'
        }
      },
      {
        firstName: 'Vincent',
        lastName: 'Liaw',
        university: 'The University of California, San Diego',
        year: '3',
        gender: 'Male',
        status: 'Confirmed',
        resume: {
          url: 'example.com'
        }
      }
    ]}/>
  ))
;