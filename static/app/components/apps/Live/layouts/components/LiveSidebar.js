import React from 'react';
import PropTypes from 'prop-types';

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
        <a dest='https://mentor.sdhacks.io' target='_blank'>Mentors</a>
        <a dest='https://slack.sdhacks.io' target='_blank'>Slack</a>
        <a dest='https://devpost.com/sdhacks2017' target='_blank'>Devpost</a>
        <Link dest='/' exact>APIs</Link>
      </Section>
      <Section name='Schedule'>
        <Link dest='/schedule'>Full Schedule</Link>
      </Section>
    </div>);
  }

  render() {
    return (<div className="live-sidebar">
      <div className={`live-sidebar__header navbar-expand-md
        navbar-inverse`}>
        <img className="live-sidebar__logo"
          src="/assets/img/vectors/logo.svg"/>
        <span className="live-sidebar__header-text">
          SDHacks 2017 Live
        </span>
      </div>

      <div className='d-none d-md-block'>
        {this.renderMenu()}
      </div>
    </div>);
  };
};
