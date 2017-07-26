import React from 'react';
import PropTypes from 'prop-types';

class SubmittedSection extends React.Component {
  static propTypes = {

  }

  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-sm-12 text-center">
          <h3>You have successfully applied for SD Hacks 2017!</h3>
          <h5>Please check your email for confirmation</h5>
        </div>
      </div>
    </div>);
  }
};

export default SubmittedSection;
