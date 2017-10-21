import React from 'react';

const apis = [
  {
    company: 'Qualcomm',
    description: 'The Qualcomm developer platform contains a suite of useful hardware and software APIs for developing across different platforms.',
    link: 'https://developer.qualcomm.com/',
  },
  {
    company: 'Amazon',
    description: 'The Amazon APIs and Services webpage provides resources for developing on many of Amazons products and platforms such as FireTV and Echo',
    link: 'https://developer.amazon.com/services-and-apis',
  },
  {
    company: 'DocuSign',
    description: 'The DocuSign API allows developers to build better signing experiences by providing a secure and globally trusted eSignature platform onto your app',
    link: 'https://www.docusign.com/developer-center',
  },
  {
    company: 'Twilio',
    description: 'The Twilio APIs allow easy sending and receiving SMS and MMS messages along with voice calls, VOIP and more.',
    link: 'https://www.twilio.com/docs/api',
  },
  {
    company: 'Unity',
    description: 'The Unity SDK Allows developing for VR.',
    link: 'https://community.webroot.com/t5/Developers/ct-p/UnityAPI',
  },
  {
    company: 'Awakens',
    description: '',
    link: 'https://genomelink.io/developers/',
  },
  {
    company: 'Viasat',
    description: '',
    link: 'https://github.com/ViaSat',
  },
];

// TODO: name api page something general and then section it off into different sections

export default class ApiPage extends React.Component {
  render() {
    return (
      <div className="container api-page">
        <div className="text-center">
          <br />
          <h1>Sponsored APIs</h1>
          <br />
        </div>
        <div className="sd-list row row-eq-height">
          {apis.map((api) =>
            <div
              className="col-lg-6 sd-card__wrapper"
              key={api.company}
            >
              <div className="card sd-card sd-card__auto">
                <div className="card-body sd-card__block">
                  <h4 className="card-title sd-card__title">{api.company}</h4>
                  <p>{api.description}</p>
                  <a className="btn btn-default rounded-button rounded-button--default" href={api.link} target="_blank">Link</a>
                </div>
              </div>
            </div>
          )}
          <div
            className="col-lg-6 sd-card__wrapper"
          >
            <div className="card sd-card sd-card__auto">
              <div className="card-body sd-card__block">
                <h4 className="card-title sd-card__title">AT&T</h4>
                <p>The AT&T developer program has various APIs for SMS, voice, and IoT development. There is a
                  <a target="_blank" href="https://join.slack.com/t/ghostredevents/shared_invite/enQtMjU4OTEzMjgzMjMzLWU4ZjYwNzRmZWNlYzYzODYxNDZjZjRkODlhMTY1OTcwMDlkOTU2OTNmOTUzMjVjOWQyZjhhMWZjODNmYzgwMTU"> slack </a>
                  with more information about the APIs. <a target="_blank" href="https://drive.google.com/open?id=0B7lIoZYO6JItN1lMQVg1bVF4YWs">Here</a> is a folder with more information about their APIs.
                </p>
                <a className="btn btn-default rounded-button rounded-button--default" href="https://developer.currentbyge.com/cityiq" target="_blank">Link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
