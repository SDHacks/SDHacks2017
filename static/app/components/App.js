import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Header here</p>

        <div className="container">
          {this.props.children}
        </div>

        <p>Footer here</p>
      </div>
    );
  }
}

export default App;
