import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';

import Nav from '../Nav';
import Sidebar from '../Sidebar';

class AdminLayout extends React.Component {
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
      <div className="admin-body">
        <LoadingBar className="loading-bar" />

        {/*Top bar navigation*/}
        <Nav toggleSidebar={this.toggleSidebar.bind(this)}></Nav>

        <div className="container-fluid">
          {/*Sidebar navigation*/}
          <div className="row">
            <Sidebar isOpen={this.state.isSidebarOpen}></Sidebar>
          </div>

          <main className={'col-sm-9 offset-sm-3 col-md-8' +
            ' col-lg-10 offset-md-4 offset-lg-2 pt-3'}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
};

export default AdminLayout;
