import React from 'react';

const apis = [
  {
    company: 'AT&T',
    link: 'https://developer.att.com/',
  },
  {
    company: 'DocuSign',
    link: 'https://www.docusign.com/developer-center',
  },
  {
    company: 'Viasat',
    link: 'https://github.com/ViaSat',
  },
  {
    company: 'Qualcomm',
    link: 'https://developer.qualcomm.com/',
  },

  {
    company: 'Twilio',
    link: 'https://www.twilio.com/docs/api',
  },

  {
    company: 'Amazon',
    link: 'https://developer.amazon.com/services-and-apis',
  },
  {
    company: 'Unity',
    link: 'https://community.webroot.com/t5/Developers/ct-p/UnityAPI',
  },
];

// TODO: name api page something general and then section it off into different sections

export default class ApiPage extends React.Component {
  render() {
    return (
      <div className="container api-page">
        <div className="text-center">
          <br />
          <h1>APIs</h1>
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
                  <a href={api.link} target="_blank">Visit</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
