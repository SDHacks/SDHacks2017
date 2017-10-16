import PropTypes from 'prop-types';
import React from 'react';
import QrReader from 'react-qr-reader';
import Q from 'q';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showLoading, hideLoading} from 'react-redux-loading-bar';

import {addUsers} from '../UsersPage/actions';

import {loadAllUsers, checkinUser} from '~/data/Api';

import {User as UserPropTypes} from '~/proptypes';

class CheckinPage extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape(
      UserPropTypes
    ).isRequired).isRequired,

    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
    addUsers: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      wasSuccessful: false,
      errorMessage: '',
      lastUser: '',
      lastName: ''
    };
  }

  componentWillMount() {
    let {users} = this.props;
    if (!users.length) {
      this.loadUsers();
    }
  }

  /**
   * Loads all the users into the redux state.
   */
  loadUsers = () => {
    let {showLoading, hideLoading, addUsers} = this.props;

    showLoading();

    loadAllUsers()
    .then(res => {
      hideLoading();
      return addUsers(res);
    });
  }

  validateUser = (user) =>
    Q.promise((resolve, reject) => {
      // Ensure they're eligible
      if (user.status !== 'Confirmed') {
        switch (user.status) {
        case ('Declined'):
          return reject('User marked as rejecting invitation');
        case ('Unconfirmed'):
          return reject('User never confirmed their invitation');
        case ('Rejected'):
        default:
          return reject('User was not invited to SD Hacks');
        }
      }
      if (user.checkedIn) {
        return reject('User has already checked in');
      }
      return resolve();
    })

  checkinById = (id) =>
    Q.promise((resolve, reject) => {
      let {users} = this.props;

      // Filter by given ID
      let eligibleUsers = users.filter((user) => user._id === id);

      if (eligibleUsers.length !== 1) {
        return reject(id);
        return reject('User not found');
      }

      // Get the particular user
      const user = eligibleUsers[0];

      Q.all([
        this.validateUser(user),
        checkinUser(user.email)
      ])
      .then(() => resolve(user))
      .catch(reject);
    });

  onScan = (data) => {
    if (data === null || this.state.isProcessing) {
      return;
    }

    if (data === this.state.lastUser) {
      return;
    }

    this.setState({
      isProcessing: true,
      wasSuccessful: false,
      errorMessage: '',
      lastUser: data,
      lastName: ''
    });
    this.checkinById(data)
    .then((user) => {
      console.log('Checked In!');
      this.setState({
        wasSuccessful: true,
        lastName: user.firstName + ' ' + user.lastName
      });
    })
    .catch((err) => {
      this.setState({
        wasSuccessful: false,
        errorMessage: err
      });
    })
    .finally(() => this.setState({
      isProcessing: false
    }));
  }

  render() {
    let {users} = this.props;
    let {errorMessage, wasSuccessful, lastName, lastUser} = this.state;

    const previewStyle = {
      height: '75%',
      width: '100%',
      display: 'inline'
    };

    if (!users.length) {
      return (
        <div className="checkin-loading">
          <h1>Loading Checkin...</h1>
        </div>
      );
    }

    return (
      <div className="checkin container d-flex">
        <div className="row">
          <div className="col-12 text-center">
            <h1>SDHacks 2017 Checkin</h1>
            {errorMessage && <h2 className="checkin__error">{errorMessage}</h2>}
            {wasSuccessful &&
              <h2 className="checkin__success">Checked In&nbsp;
                <span className="checkin__name">{lastName}</span>!
              </h2>
            }
            <QrReader
              delay={200}
              style={previewStyle}
              onError={console.error}
              onScan={this.onScan}
              />
            {lastUser}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.admin.auth,
    user: state.admin.auth.user,
    users: state.admin.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showLoading: bindActionCreators(showLoading, dispatch),
    hideLoading: bindActionCreators(hideLoading, dispatch),
    addUsers: bindActionCreators(addUsers, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckinPage);
