import React from 'react';

export default class User extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
}
