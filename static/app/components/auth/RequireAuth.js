import {Cookies, withCookies} from 'react-cookie';
import PropTypes, {instanceOf} from 'prop-types';
import Q from 'q';
import React from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: PropTypes.object
    }

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired,
      authenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
    }

    goToLogin() {
      return this.props.dispatch(push('/login'));
    }

    componentDidMount() {
      if (!this.props.authenticated) {
        return this.goToLogin();
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
        return this.goToLogin();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }

  return connect(mapStateToProps)
    (withCookies(Authentication));
};
