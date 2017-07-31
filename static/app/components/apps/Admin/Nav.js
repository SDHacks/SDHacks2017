import React from 'react';
import {Navbar, NavbarToggler} from 'reactstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends React.Component {
  static propTypes = {
    toggleSidebar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar color="primary" inverse toggleable className="sticky-top">
        <NavbarToggler right onClick={this.props.toggleSidebar} />

        <Link to="/admin">
          <div className="navbar-brand">
            <img src="/assets/img/vectors/logo.svg" width="30" height="30"
              alt="" className="d-inline-block align-top" />
            &nbsp;SD Hacks 2017
          </div>
        </Link>
      </Navbar>
    );
  };
};

export default Nav;
