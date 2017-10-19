import React from 'react';

const Countdown = ({endTime}) => {
  return (
    <ul className="sd-countdown">
      <li className="sd-countdown__time sd-countdown__hours">
        <span className="sd-countdown__number">00</span>
        <span className="sd-countdown__label">Hour</span>
      </li>
      <li className="sd-countdown__time sd-countdown__minutes">
        <span className="sd-countdown__number">00</span>
        <span className="sd-countdown__label">Minutes</span>
      </li>
      <li className="sd-countdown__time sd-countdown__seconds">
        <span className="sd-countdown__number">00</span>
        <span className="sd-countdown__label">Seconds</span>
      </li>
    </ul>
  );
};

export default Countdown;
