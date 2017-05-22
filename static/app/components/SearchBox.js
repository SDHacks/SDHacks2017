import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../actions';

class SearchBox extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired
  };

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

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filter) => {
      dispatch(setFilter(filter));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
