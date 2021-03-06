import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

export default class Link extends React.Component {
  static propTypes = {
    dest: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };

  render() {
    let {children, dest, exact} = this.props;

    return (
      <NavLink className="live-sidebar__section-link" to={`/live${dest}`}
        activeClassName="live-sidebar__section-link--active" exact={exact}>
        {children}
      </NavLink>);
  }
};
