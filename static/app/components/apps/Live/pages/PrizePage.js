import React from 'react';

const apiPrizeData = [
  {
    id: 'att',
    sponsoredBy: 'AT&T',
    name: 'Smart Cities',
    description: 'Echo Dot for the best hack utilizing the Smart Cities datasets and APIs to be provided by AT&T.',
  },
  {
    id: 'tech',
    sponsoredBy: '.TECH',
    name: '.TECH Hack',
    description: '$150 Amazon Gift Vouchers for the best hack/website submitted on a .TECH domain',
  },
  {
    id: 'twilio',
    sponsoredBy: 'Twilio',
    name: 'Twilio API Prize',
    description: 'Sponsored prize for the best use of Twilio API (to be provided by Twilio)',
  },
  {
    id: 'curiopets',
    sponsoredBy: 'CurioPets',
    name: 'Best AR/VR/ Mobile App',
    description: 'Sponsored prize for "Best AR/VR Mobile App" (To be provided by CurioPets)',
  },
  {
    id: 'amazon',
    sponsoredBy: 'Amazon',
    name: 'Amazon Prize',
    description: 'AWS Credits'
  },
  {
    id: 'illumina',
    sponsoredBy: 'Illumina Accelerator',
    name: 'Best use of Genome Link API',
    description: 'Best use of Genome Link API ($3,000 in prize money)',
  },
  {
    id: 'nanome',
    sponsoredBy: 'Nanome',
    name: 'Blockchain Hackathonception',
    description: `The Ethereum Blockchain, IPFS and other distributed-computing technologies have forever changed the landscape of software development. For this category, use the Ethereum Virtual Machine and other distributed technologies to develop a hackathon tournament system on the Ethereum blockchain! Winner will receive an Oculus Rift headset and 2328 MTX tokens (equivalent to about 2 Ether)! 
    Hint: Storage on the blockchain is expensive. Use off-chain distributed storage where you can!`,
  }
];

export default class PrizePage extends React.Component {
  render() {
    return (
      <div className="container api-page">
        <div className="text-center">
          <br />
          <h1>Prizes</h1>
          <br />
        </div>
        <div className="list-unstyled row">
          {apiPrizeData.map((prize) =>
            <div
              className="col-lg-6 sd-card__wrapper"
              key={prize.name}
            >
              <div className="card sd-card sd-card__auto">
                <div className="card-body sd-card__block">
                  <div className="text-center">
                    <h4 className="card-title sd-card__title">{prize.name}</h4>
                  </div>
                  <div className="text-center">{prize.sponsoredBy}</div>
                  <br />
                  <p>{prize.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
