import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, Redirect} from 'react-router-dom';

class FullRedirect extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    exact: PropTypes.bool
  };

  render() {
    let {from, to, exact, history} = this.props;

    return (
      <Redirect to={{
        pathname: to,
        hash: history.location.hash,
        search: history.location.search
      }} from={from} exact={exact} />
    );
  }
};

export default withRouter(FullRedirect);
