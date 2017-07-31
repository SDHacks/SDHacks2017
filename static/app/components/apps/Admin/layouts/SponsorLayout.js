import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';

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
        <LoadingBar className="loading-bar" />
        {this.props.children}
      </div>
    );
  }
};

export default SponsorLayout;
