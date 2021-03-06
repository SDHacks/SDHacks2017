import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './components/LiveSidebar';

export default class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="live-body d-flex flex-column w-100" style={{overflowX: 'hidden'}}>
        <div className="container-fluid p-0 w-100 max-height">
          <div className="d-flex flex-column flex-md-row h-100">
            <div className={'live-sidebar__container'}>
              <Sidebar />
            </div>

            <main className='live-body__content'>
              <div className="hexagon-hero__background user-login__background">
                <div className="hexagon-hero__water" />
                <div className="hexagon-hero__beach" />
              </div>
              {this.props.children}
            </main>
          </div>
        </div>
      </div>
    );
  }
};
