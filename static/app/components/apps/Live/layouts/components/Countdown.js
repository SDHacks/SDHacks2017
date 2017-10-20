import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
  startTime: PropTypes.instanceOf(Date),
};

const defaultProps = {
  // Minimum ever date
  startTime: new Date(0),
};

/**
 * Countdown component
 */
const Countdown = ({currTime, startTime, endTime}) => {
  const diff = endTime - Math.max(currTime, startTime);

  const hourDiff = Math.floor(diff / 36e5);
  const minuteDiff = Math.floor(diff % 36e5 / 60000);
  const secondsDiff = Math.floor(diff % 60000 / 1000);

  return (
    <ul className="sd-countdown list-unstyled">
      <li className="sd-countdown__time sd-countdown__hours">
        <span className="sd-countdown__number">{hourDiff}</span>
        <div className="sd-countdown__label">Hour{hourDiff !== 1 && 's'}</div>
      </li>
      <li className="sd-countdown__time sd-countdown__minutes">
        <div className="sd-countdown__number">{minuteDiff}</div>
        <div className="sd-countdown__label">Minute{minuteDiff !== 1 && 's'}</div>
      </li>
      <li className="sd-countdown__time sd-countdown__seconds">
        <div className="sd-countdown__number">{secondsDiff}</div>
        <div className="sd-countdown__label">Second{secondsDiff !== 1 && 's'}</div>
      </li>
    </ul>
  );
};

Countdown.propTypes = propTypes;
Countdown.defaultProps = defaultProps;

export default Countdown;
