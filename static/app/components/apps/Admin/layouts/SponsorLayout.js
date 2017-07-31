import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';

import Nav from '../Nav';
import Sidebar from '../Sidebar';

class SponsorLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false
    };
  }

  componentDidUpdate() {
    if (this.state.isSidebarOpen) {
      this.setState({
        isSidebarOpen: false
      });
    }
  }

  toggleSidebar() {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    });
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
