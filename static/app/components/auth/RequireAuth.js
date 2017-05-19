import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

export default function(ComposedComponent) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.redirectToLogin();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.redirectToLogin();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }

  const mapDispatchToProps = (dispatch) => ({
    redirectToLogin: () => {
      dispatch(push('/login'));
    }
  });

  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    redirectToLogin: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};
