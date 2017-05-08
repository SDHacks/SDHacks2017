import React from 'react';
import PropTypes from 'prop-types';

class SearchBox extends React.Component {
  render() {
    return (<div>
      Search:&nbsp;
      <input
      onChange={(e) => this.props.updateFilter(e.target.value)}
      type="text"
      value={this.props.filter}>
      </input>
    </div>);
  }
}

SearchBox.propTypes = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired
};

export default SearchBox;
