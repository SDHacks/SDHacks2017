import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Dashboard for {this.props.auth.user}</p>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {auth: state.auth};
}

export default connect(mapStateToProps)(Dashboard);
