import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Link from './Link';
import Section from './Section';
import Countdown from './Countdown';

export default class LiveSidebar extends React.Component {
  /**
   * Creates the static menu
   */
  renderMenu() {
    return (<div>
      <Section name='Countdown'>
        <Countdown endTime={'Fri Oct 20 10:00:00 2017 PDT'} />  
      </Section>
      <Section name='General'>
        <Link dest='/map'>Map</Link>
        <Link dest='/' exact>APIs</Link>
        <a
          className="live-sidebar__section-link"
          href='https://mentor.sdhacks.io'
          target='_blank'
        >
          Mentors
          <FontAwesome className="float-right" name="external-link" />
        </a>
        <a
          className="live-sidebar__section-link"
          href='https://slack.sdhacks.io'
          target='_blank'
        >
          Slack
          <FontAwesome className="float-right" name="external-link" />
        </a>
        <a
          className="live-sidebar__section-link"
          href='https://devpost.com/sdhacks2017'
          target='_blank'
        >
          Devpost
          <FontAwesome className="float-right" name="external-link" />
        </a>
      </Section>
      <Section name='Schedule'>
        <Link dest='/schedule'>Full Schedule</Link>
      </Section>
      <Section name="Current Events">
      </Section>
      <Section name="Upcoming">
      </Section>
    </div>);
  }

  render() {
    return (<div className="live-sidebar">
      <div className={`live-sidebar__header navbar-expand-md
        navbar-inverse`}>
        <a href="/">
          <img className="live-sidebar__logo"
            src="/assets/img/vectors/logo.svg"/>
          <span className="live-sidebar__header-text">
            SDHacks 2017 Live
          </span>
        </a>
      </div>

      <div className='d-none d-md-block'>
        {this.renderMenu()}
      </div>
    </div>);
  };
};
