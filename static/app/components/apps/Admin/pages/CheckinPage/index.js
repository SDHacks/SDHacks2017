import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import QrReader from 'react-qr-reader';

class CheckinPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    };

    return (
      <div className="checkin container d-flex">
        <div className="row">
          <div className="col-12 text-center">
            <h1>SDHacks 2017 Checkin</h1>
            <QrReader
              delay={100}
              style={previewStyle}
              onError={console.error}
              onScan={console.log}
              />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.admin.auth,
    user: state.admin.auth.user
  };
}

export default connect(mapStateToProps)(CheckinPage);
