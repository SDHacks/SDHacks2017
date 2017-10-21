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
          <div className="col-lg-6 sd-card__wrapper">
            <div className="card sd-card sd-card__auto">
              <div className="card-body sd-card__block text-center">
                <h4 className="card-title sd-card__title">Slack</h4>
                <div className="card-text sd-card__text text-center">
                  <p>Get on the <a href="https://sdhackers2017.slack.com" target="_blank">SD Hacks Slack</a> to keep up with information for announcements and workshops. Use the link telow to join.</p>
                  <a className="btn btn-default rounded-button rounded-button--default" href="https://slack.sdhacks.io" target="_blank">Join SD Hackers 2017</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 sd-card__wrapper">
            <div className="card sd-card sd-card__auto">
              <div className="card-body sd-card__block text-center">
                <h4 className="card-title sd-card__title">Hardware</h4>
                <div className="card-text sd-card__text text-center">
                  <p>Access hardware through this <a href="https://hardware.mlh.io/" target="_blank">MLH Hardware Portal</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 sd-card__wrapper">
            <div className="card sd-card sd-card__auto">
              <div className="card-body sd-card__block text-center">
                <h4 className="card-title sd-card__title">Devpost</h4>
                <div className="card-text sd-card__text text-center">
                  <p>We are using <a href="https://sdhacks2017.devpost.com/" target="_blank">Devpost</a> to submit hacks. Make sure to submit your hack by 10:00 AM on Sunday 10/22</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
