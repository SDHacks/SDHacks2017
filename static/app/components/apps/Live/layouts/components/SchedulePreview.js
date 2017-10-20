import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import ScheduleManager from '~/static/Schedule';

const propTypes = {
  current: PropTypes.bool.isRequired,
  currTime: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.array.isRequired,
  numEventsShown: PropTypes.number,
};

const defaultProps = {
  // Minimum ever date
  numEventsShown: -1,
};

/**
 * Shows a preview of events either current or after schedule
 */
const SchedulePreview = ({currTime, current, events, numEventsShown}) => {
  let eventsToShow;

  if (current) {
    eventsToShow = events.filter((event) => {
      return new Date(event.start) < currTime
        && currTime < new Date(event.end);
    });
  } else {
    eventsToShow = events.filter((event) => {
      return new Date(event.start) > currTime;
    });
  }

  if (numEventsShown !== -1) {
    eventsToShow = eventsToShow.slice(0, numEventsShown);
  }

  return (
    <ul className="sd-schedule-preview list-unstyled">
      {!eventsToShow.length &&
        <Link
          className="live-sidebar__section-link"
          to="/live/schedule"
        >
          Nothing - View Schedule
        </Link>
      }
      {eventsToShow.map((elem) =>
        <Link
          className="live-sidebar__section-link"
          to="/live/schedule"
          key={elem.name}
        >
          <li className="center-block">
            <span className="sd-schedule__event">{elem.name}</span>
            <span className="float-right">
              {ScheduleManager.getNonMilitaryStartTime(elem.start)}
            </span>
          </li>
        </Link>
      )}
    </ul>
  );
};

SchedulePreview.propTypes = propTypes;
SchedulePreview.defaultProps = defaultProps;

export default SchedulePreview;
