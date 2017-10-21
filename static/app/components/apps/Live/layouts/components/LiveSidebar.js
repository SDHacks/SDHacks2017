import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {NavbarToggler} from 'reactstrap';

import Link from './Link';
import Section from './Section';
import Countdown from './Countdown';
import SchedulePreview from './SchedulePreview';

import scheduleData from '~/static/Schedule/data';

const hackingStartTime = new Date('Fri, 20 Oct 2017 22:00:00 -0700');
const hackingEndTime = new Date('Sun, 22 Oct 2017 10:00:00 -0700');

export default class LiveSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      ishidden: false,
    };

    // Set consts to this component
    this.hackingStartTime = hackingStartTime;
    this.hackingEndTime = hackingEndTime;
    this.scheduleData = scheduleData;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Toggles whether the menu is hidden on small devices
   */
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  /**
   * Creates the static menu
   */
  renderMenu() {
    return (<div>
      <Section name='Countdown'>
        <Countdown
          currTime={this.state.date}
          startTime={this.hackingStartTime}
          endTime={this.hackingEndTime}
        />
      </Section>
      <Section name='General'>
        <Link dest='/' exact>Live Site Home</Link>
        <Link dest='/map'>Map</Link>
        <Link dest='/apis'>Software & APIs</Link>
        <Link dest='/prizes'>Prizes</Link>
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
          href='https://sdhacks2017.slack.com'
          target='_blank'
        >
          Slack
          <FontAwesome className="float-right" name="external-link" />
        </a>
        <a
          className="live-sidebar__section-link"
          href='https://hardware.mlh.io'
          target='_blank'
        >
          Hardware
          <FontAwesome className="float-right" name="external-link" />
        </a>
        <a
          className="live-sidebar__section-link"
          href='https://sdhackers2017.devpost.com'
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
        <SchedulePreview
          current={true}
          currTime={this.state.date}
          events={this.scheduleData}
        />
      </Section>
      <Section name="Upcoming">
        <SchedulePreview
          current={false}
          numEventsShown={2}
          currTime={this.state.date}
          events={this.scheduleData}
        />
      </Section>
    </div>);
  }

  render() {
    return (
      <div className="live-sidebar">
        <div className={`live-sidebar__header navbar-expand-md
          navbar-inverse`}>
          <a href="/">
            <img className="live-sidebar__logo"
              src="/assets/img/vectors/logo.svg"/>
            <span className="live-sidebar__header-text">
              SDHacks 2017 Live
            </span>
          </a>
          <div
            className="admin-sidebar__user-toggle"
            style={{
              position: 'absolute',
              right: '16px',
            }}
          >
            <NavbarToggler
              right
              className="admin-sidebar__toggler navbar-dark float-right"
              onClick={this.toggleHidden.bind(this)}
            />
          </div>
        </div>

        <div className={this.state.isHidden ? 'd-none d-md-block' : ''}>
          {this.renderMenu()}
        </div>
      </div>
    );
  };
};
