import React from 'react';

const apiPrizeData = [
  {
    id: 'grandprize',
    sponsoredBy: 'SD Hacks',
    name: 'Grand Prize',
    description: `The team with the best hack overall will win a PS4 Pro, DJI Spark, Oculus Rift + Touch and an Apple Watch 3.
    Each member will also get a job interview from one of our sponsors, SPAWAR.`,
  },
  {
    id: 'second',
    sponsoredBy: 'SD Hacks',
    name: 'Second Prize',
    description: 'The team with the second best hack overall will win an Amazon Echo Show, a pair of Beats Solo Wireless 3, a QHD monitor, and a Muse Headband'
  },
  {
    id: 'third',
    sponsoredBy: 'SD Hacks',
    name: 'Third Prize',
    description: `The team with the third best hack overall will win a Samsung Gear VR, Holy Stone Drone, 
    BeatsX, and an HD monitor.`,
  },
  {
    id: 'att',
    sponsoredBy: 'AT&T',
    name: 'Best Smart Cities Hack presented by AT&T',
    description: 'Echo Dot for the best hack utilizing the Smart Cities datasets and APIs to provided by AT&T.',
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
    name: 'Best Use of Twilio API',
    description: 'Merge VR/AR Goggles for each team member.',
  },
  {
    id: 'curiopets',
    sponsoredBy: 'CurioPets & High Moon',
    name: 'Best AR/VR Hack',
    description: 'First Place: Corsair K63 Mechanical Keyboards, Razer DeathAdder Gaming Mouses and a tour of High Moon Studios for each team member. Second Place: Gift cards for team members.',
  },
  {
    id: 'amazon',
    sponsoredBy: 'Amazon',
    name: ' Amazon Web Services - Best Use of AWS',
    description: '$250 Amazon Web Services Credit',
  },
  {
    id: 'illumina',
    sponsoredBy: 'Illumina Accelerator',
    name: 'Best use of Genome Link API',
    description: 'Best use of Genome Link API ($3,000 in prize money)',
    link: 'https://genomelink.io/developers/',
  },
  {
    id: 'docusign',
    sponsoredBy: 'Docusign',
    name: 'Best Hack using the DocuSign eSignature API',
    description: 'First Place: $2000 Cash Prize, Second Place: $1000 Cash Prize',
  },
  {
    id: 'beginner',
    sponsoredBy: 'SD Hacks',
    name: 'Best Beginner Hack',
    description: 'Raspberry Pi Kits for each team member in a team of all first-time hackers.',
  },
  {
    id: 'domain',
    sponsoredBy: 'Domain.com',
    name: 'Best Domain Name from Domain.com',
    description: 'Raspberry Pi & PiHut Essential Kit',
  },
  {
    id: 'marines',
    sponsoredBy: 'Marines',
    name: 'Marines Innovation Challenge',
    description: 'Winning team(s) each receive up to $5K funding from MD5 plus mentorship/space from EvoNexus to advance their concept with USMC.',
  },
  {
    id: 'qualcomm',
    sponsoredBy: 'Qualcomm',
    name: ' Best IoT Hack Using a Qualcomm Device',
    description: '410C Dragonboard for each team member',
  },
  {
    id: 'nanome',
    sponsoredBy: 'Nanome',
    name: 'Blockchain Hackathonception',
    description: `The Ethereum Blockchain, IPFS and other distributed-computing technologies have forever changed the landscape of software development. For this category, use the Ethereum Virtual Machine and other distributed technologies to develop a hackathon tournament system on the Ethereum blockchain! Winner will receive an Oculus Rift headset and 2328 MTX tokens (equivalent to about 2 Ether)! 
    Hint: Storage on the blockchain is expensive. Use off-chain distributed storage where you can!`,
  },
  {
    id: 'qi',
    sponsoredBy: 'Qualcomm Institute',
    name: 'Best use of Tech to Combat Human Trafficking',
    description: '$1000 donation to a organization that combats human trafficking',
  },
  {
    id: 'neurogaming',
    sponsoredBy: 'Power of NeuroGaming Center',
    name: 'Best Game that Incorporates Movement for Good',
    description: 'Make a game that incorporates movement for good. Tobii eye trackers for each member of the team, and two tickets to fleet science center.',
  },
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
