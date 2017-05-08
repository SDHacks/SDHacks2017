import React from 'react';
import VisibleSearchBox from '../containers/VisibleSearchBox';
import VisibleUserList from '../containers/VisibleUserList';

export default class App extends React.Component {
  render() {
		return (
    <div className="container">
      <VisibleSearchBox />
      <div className="row">
        <VisibleUserList />
      </div>
    </div>);
  }
}
