import React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse">
        <Link className="navbar-brand" to="/">
          <img src="/assets/img/vectors/logo.svg" width="30" height="30"
            alt="" className="d-inline-block align-top" />
          &nbsp;SD Hacks 2017
        </Link>
      </nav>
    );
  };
};

export default Nav;
