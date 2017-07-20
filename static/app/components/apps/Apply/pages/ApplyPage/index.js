import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import PersonalSection from './components/PersonalSection';

class ApplyPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  onSubmit() {

  }

  nextPage() {
    this.setState({page: this.state.page + 1});
  }

  previousPage() {
    this.setState({page: this.state.page - 1});
  }

  render() {
    const {page} = this.state;

    return (
      <div className="sd-form__wrapper">
        <div className="sd-form">
          <h1 className="sd-form__header">Apply for SD Hacks 2017</h1>
          {page === 1 && <PersonalSection onSubmit={this.nextPage} />}
          {page === 2 && <PersonalSection previousPage={this.previousPage}
            onSubmit={this.nextPage} />}
          {page === 3 && <PersonalSection previousPage={this.previousPage}
            onSubmit={this.onSubmit} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // errorMessage: state.apply.application.error,
    // message: state.apply.application.message
  };
}

export default connect(mapStateToProps)(ApplyPage);
