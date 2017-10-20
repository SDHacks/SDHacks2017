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

export default class ApiPage extends React.Component {
  render() {
    return (
      <div className="container api-page">
        <div className="text-center">
          <br />
          <h1>APIs</h1>
          <br />
        </div>
        <ul className="list-unstyled">
          {apis.map((api) =>
            <li>
              <div>{api.company}</div>
              <a href={api.link} target="_blank">Visit</a>
              <br />
              <br />
            </li>
          )}
        </ul>
      </div>
    );
  }
}
