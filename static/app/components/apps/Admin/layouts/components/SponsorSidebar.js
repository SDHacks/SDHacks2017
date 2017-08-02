import React from 'react';
import PropTypes from 'prop-types';
import {NavbarToggler} from 'reactstrap';

import {Roles, getRole} from '~/static/Roles';

import Filter from './Filter';
import Link from './Link';
import Section from './Section';

class SponsorSidebar extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    selected: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    filters: PropTypes.object.isRequired,

    toggleFilter: PropTypes.func.isRequired,
    toggleFilterOption: PropTypes.func.isRequired,
    selectAllOptions: PropTypes.func.isRequired,
    selectNoneOptions: PropTypes.func.isRequired,

    isHidden: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      isHidden: this.props.isHidden ? this.props.isHidden : true
    };
  }

  /**
   * Toggles whether the menu is hidden on small devices
   */
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  /**
   * Creates the user menu for the authenticated user.
   */
  renderUser() {
    let {user, selected} = this.props;

    return (
      <div className="admin-sidebar__user-box">
        <div className="admin-sidebar__user-name text-uppercase">
          Welcome, {user.username}
        </div>
        <div className="admin-sidebar__download">
          <button className="btn rounded-button rounded-button--small">
            Download ({selected})
          </button>
        </div>
      </div>
    );
  }

  handleToggleFilter = (name) =>
    () => this.props.toggleFilter(name);

  handleToggleFilterOption = (filter) =>
    (name) => this.props.toggleFilterOption(filter, name);

  handleSelectAll = (name) =>
    () => this.props.selectAllOptions(name);

  handleSelectNone = (name) =>
    () => this.props.selectNoneOptions(name);

  /**
   * Renders the all filters
   */
  renderFilters() {
    let {filters} = this.props;

    return (<div className="admin-sidebar__filters">

      {Object.keys(filters).map((filterName, i) => {
        let filter = filters[filterName];
        return (<Filter key={i}
          enabled={filter.enabled} name={filter.displayName}
          options={filter.options}
          onOptionChange={this.handleToggleFilterOption(filterName)}
          onEnableChange={this.handleToggleFilter(filterName)}
          selectAllOptions={this.handleSelectAll(filterName)}
          selectNoneOptions={this.handleSelectNone(filterName)} />);
      })}
    </div>);
  }

  render() {
    let {selected, total} = this.props;

    return (<div className="admin-sidebar">
      <div className={`admin-sidebar__header navbar-toggleable-md
        navbar-inverse`}>
        <img className="admin-sidebar__logo"
          src="/assets/img/vectors/logo.svg"/>
        <span className="admin-sidebar__header-text">
          Sponsor Resume Tool
        </span>
        <NavbarToggler right
          className="admin-sidebar__toggler"
          onClick={this.toggleHidden.bind(this)} />
      </div>

      <div className={this.state.isHidden ? 'hidden-sm-down' : ''}>
        {this.renderUser()}
        <div className="admin-sidebar__selected">
          Showing: {selected} of {total}
        </div>

        <Section name='Global Toggles'>
          <div className="admin-sidebar__toggles">
            <button className={`btn rounded-button rounded-button--small
              rounded-button--success admin-sidebar__toggle`}>
              Select All
            </button>
            <button className={`btn rounded-button rounded-button--small
              rounded-button--alert admin-sidebar__toggle`}>
              Select None
            </button>
          </div>
        </Section>

        <Section name='Filters'>
          {this.renderFilters()}
        </Section>

        <Section name='General'>
          <Link dest='/' exact>Dashboard</Link>
          <Link dest='/settings'>Settings</Link>
          <Link dest='/logout'>Logout</Link>
        </Section>
      </div>
    </div>);
  };
};



export default SponsorSidebar;
