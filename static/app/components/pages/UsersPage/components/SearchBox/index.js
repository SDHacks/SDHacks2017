import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {setFilter} from '../../actions';

const form = reduxForm({
  form: 'search'
});

class SearchBox extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <label htmlFor="userSearch">Search</label>
            <Field
              id="userSearch"
              name="search"
              className="form-control"
              component="input"
              type="text"
              onChange={event => {
                this.props.updateFilter(event.target.value);
              }}
              value={this.props.filter} />
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  filter: state.userFilter
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filter) => {
      dispatch(setFilter(filter));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(form(SearchBox));
