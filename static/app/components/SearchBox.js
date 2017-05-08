import React from 'react';
import PropTypes from 'prop-types';

class SearchBox extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="small-1 columns">
          <label className="text-right middle">Search</label>
        </div>
        <div className="small-3 columns end">
          <input
            onChange={(e) => this.props.updateFilter(e.target.value)}
            type="text"
            value={this.props.filter}>
          </input>
        </div>
      </div>);
  }
}

SearchBox.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired
};

export default SearchBox;
