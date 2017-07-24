import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import PersonalSection from './components/PersonalSection';
import ResponseSection from './components/ResponseSection';
import SubmittedSection from './components/SubmittedSection';

class ApplyPage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  loadPageFromHash() {
    const {history} = this.props;
    if (!history.location.hash) {
      if (this.state.page !== 1) {
        this.setState({page: 1});
      }
      return;
    }

    let page = parseInt(history.location.hash.substring(1));
    if (this.state.page === page) {
      return;
    }
    this.setState({page: page});
  }

  componentWillMount() {
    this.loadPageFromHash();
  }

  componentWillUpdate() {
    this.loadPageFromHash();
  }

  onSubmit() {
    this.nextPage();
  }

  updateHash(page) {
    const {history} = this.props;

    history.push({
      pathname: history.location.pathname,
      hash: '#' + page
    });
  }

  nextPage() {
    const newPage = this.state.page + 1;
    this.setState({page: newPage});
    this.updateHash(newPage);
  }

  previousPage() {
    const newPage = this.state.page - 1;
    this.setState({page: newPage});
    this.updateHash(newPage);
  }

  createHeader() {
    return (<div className="container sd-form__header">
      <div className="row no-gutters">
        <div className="col-2 col-md-12">
          <img className="sd-form__logo"
            src="/assets/img/vectors/logo.svg" />
        </div>
        <div className="col-10 col-md-12 align-self-center">
          <div className="sd-form__header--text">Apply for SD Hacks 2017</div>
        </div>
      </div>
    </div>);
  }

  render() {
    const {page} = this.state;

    return (
      <div className="sd-form__wrapper">
        <div className="sd-form">
          {this.createHeader()}
          {page === 1 && <PersonalSection onSubmit={this.nextPage} />}
          {page === 2 && <ResponseSection onSubmit={this.onSubmit}
            previousPage={this.previousPage} />}
          {page === 3 && <SubmittedSection />}
        </div>
      </div>
    );
  }
}

export default withRouter(ApplyPage);
