import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

const form = reduxForm({
  form: 'filterUsers'
});

class SearchBox extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="form-group">
        <div className="row">
          <form className="col-sm-12 col-md-4 input-group"
            onSubmit={handleSubmit}>
            <Field
              id="userSearch"
              name="filter"
              className="form-control"
              component="input"
              placeholder="Filter"
              type="text"
              value={this.props.filter} />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">
                Filter
              </button>
            </span>
          </form>
        </div>
      </div>);
  }
}

export default connect()(form(SearchBox));
