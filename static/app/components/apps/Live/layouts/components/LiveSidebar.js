import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';
import Section from './Section';

export default class LiveSidebar extends React.Component {
  /**
   * Creates the static menu
   */
  renderMenu() {
    return (<div>
      <Section name='General'>
        <Link dest='/' exact>APIs</Link>
        <Link dest='/schedule'>Schedule</Link>
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
