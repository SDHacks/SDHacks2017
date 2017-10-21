import React from 'react';

export default class SchedulePage extends React.Component {
  render() {
    return (
      <div className="container schedule-page">
        <div className="text-center">
          <br />
          <h1>Schedule</h1>
          <br />
        </div>
        {/* <p>This is the Schedule Page!</p> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sd-card__wrapper">
                <div className="card sd-card sd-card__schedule">
                  <div className="card-body sd-card__block">
                    <div className="text-center">
                      <h4 className="card-title sd-card__title">
                        Friday, October 20
                      </h4>
                    </div>
                    <ul className="sd-schedule__list list-unstyled">
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">7pm</span>
                        <span className="sd-schedule__event">Check In</span>
                        <span className="sd-schedule__location">&nbsp;</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">7pm</span>
                        <span className="sd-schedule__event">Dinner</span>
                        <span className="sd-schedule__location">Lobby</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">9pm</span>
                        <span className="sd-schedule__event">Opening Ceremony</span>
                        <span className="sd-schedule__location">Main Stage</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">10pm</span>
                        <span className="sd-schedule__event">Hacking Begins</span>
                        <span className="sd-schedule__location">&nbsp;</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">10-10:30pm</span>
                        <span className="sd-schedule__event">Team Mixer</span>
                        <span className="sd-schedule__location">2nd floor</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">10:30-11:15pm</span>
                        <span className="sd-schedule__event">Marines Innovation Challenge Info Session</span>
                        <span className="sd-schedule__location">Green Room</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">10:30-11:15pm</span>
                        <span className="sd-schedule__event">Qualcomm DragonBoard Workshop</span>
                        <span className="sd-schedule__location">Dugout Room</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">11:30pm-2:30am</span>
                        <span className="sd-schedule__event">Virtual Reality and Gaming Workshop</span>
                        <span className="sd-schedule__location">Green Room</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">11:30pm-1:30am</span>
                        <span className="sd-schedule__event">Nodeschool Workshop</span>
                        <span className="sd-schedule__location">Dugout Room</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sd-card__wrapper">
                <div className="card sd-card sd-card__schedule">
                  <div className="card-body sd-card__block">
                    <div className="text-center">
                      <h4 className="card-title sd-card__title">Saturday, October 21</h4>
                    </div>
                    <ul className="sd-schedule__list list-unstyled">
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">2-4am</span>
                        <span className="sd-schedule__event">iOS Workshop</span>
                        <span className="sd-schedule__location">Dugout Room</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">8:30am</span>
                        <span className="sd-schedule__event">Breakfast</span>
                        <span className="sd-schedule__location">Lobby</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">11am-1pm</span>
                        <span className="sd-schedule__event">SPAWAR Tech Talk</span>
                        <span className="sd-schedule__location">Green Room</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">1pm</span>
                        <span className="sd-schedule__event">Lunch</span>
                        <span className="sd-schedule__location">Lobby</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">3-3:45pm</span>
                        <span className="sd-schedule__event">Getting Into Game Development</span>
                        <span className="sd-schedule__location">Green Room</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">7:30pm</span>
                        <span className="sd-schedule__event">Dinner</span>
                        <span className="sd-schedule__location">Lobby</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="sd-card__wrapper">
                <div className="card sd-card sd-card__schedule">
                  <div className="card-body sd-card__block">
                    <div className="text-center">
                      <h4 className="card-title sd-card__title">Sunday, October 22</h4>
                    </div>
                    <ul className="sd-schedule__list list-unstyled">
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">7am</span>
                        <span className="sd-schedule__event">Breakfast</span>
                        <span className="sd-schedule__location">Lobby</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">10am</span>
                        <span className="sd-schedule__event">Lunch</span>
                        <span className="sd-schedule__location">Lobby</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">10am</span>
                        <span className="sd-schedule__event">Hacking Ends</span>
                        <span className="sd-schedule__location"></span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">11am-1pm</span>
                        <span className="sd-schedule__event">Demos and Judging</span>
                        <span className="sd-schedule__location">Main Stage</span>
                      </li>
                      <li className="sd-schedule__list-elem">
                        <span className="sd-schedule__time">1-2pm</span>
                        <span className="sd-schedule__event">Closing Ceremony</span>
                        <span className="sd-schedule__location">Main Stage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
