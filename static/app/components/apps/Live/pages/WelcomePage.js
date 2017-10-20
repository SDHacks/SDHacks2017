import React from 'react';

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div className="container welcome-page">
        <div className="text-center">
          <br />
          <h1>Welcome to SD Hacks 2017!</h1>
          <br />
        </div>
        <div className="row">
          <div className="col-lg-6 sd-card__wrapper">
            <div className="card sd-card sd-card__auto">
              <div className="card-body sd-card__block text-center">
                <h4 className="card-title sd-card__title">Network Name</h4>
                <div className="card-text sd-card__text text-center">
                  <h4>SDHACKS17</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 sd-card__wrapper">
            <div className="card sd-card sd-card__auto">
              <div className="card-body sd-card__block">
                <div className="text-center">
                  <h4 className="card-title sd-card__title">Shirt Colors</h4>
                </div>
                <ul className="sd-schedule__list list-unstyled">
                  <li className="sd-schedule__list-elem">
                    <span className="sd-schedule__event">Hacker</span>
                    <span className="sd-schedule__time sd-schedule__blue">Blue</span>
                  </li>
                  <li className="sd-schedule__list-elem">
                    <span className="sd-schedule__event">Mentor</span>
                    <span className="sd-schedule__red">Red</span>
                  </li>
                  <li className="sd-schedule__list-elem">
                    <span className="sd-schedule__event">Volunteer</span>
                    <span className="sd-schedule__time">Purple</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
