import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import {getSuggestions} from '~/static/Universities';

export default class UniversityField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };
  }

  onFetchRequested({value}) {
    let suggestions = getSuggestions(value);
    this.setState({
      suggestions
    });
  }

  onClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  renderSuggestion(suggestion) {
    return (<a>
      {suggestion}
    </a>);
  }

  getSuggestionValue = (suggestion) => suggestion;

  render() {
    let {input, className, meta: {touched, error}} = this.props;
    let {suggestions} = this.state;

    // Inject class
    input.className = className;

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onClearRequested.bind(this)}
        renderSuggestion={this.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        inputProps={input}
      />
    );
  }
};
