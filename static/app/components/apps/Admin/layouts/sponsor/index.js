import React from 'react';
import PropTypes from 'prop-types';

class SponsorLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sponsor-body">
        {this.props.children}
      </div>
    );
  }
};

export default SponsorLayout;
