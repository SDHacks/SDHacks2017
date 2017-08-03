import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

import {getSuggestions} from '~/static/Universities';

import fields from './Fields';

export default class UniversityField extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string
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
    return (<a tabIndex="-1"
      onClick={() => this.props.input.onChange(suggestion)}
      className="sd-form__suggestions-link">
      {suggestion}
    </a>);
  }

  getSuggestionValue = (suggestion) => suggestion;

  shouldRenderSuggestions = (value) => value.trim().length > 2;

  /**
   * As defined by the react-autosuggest documentation
   */
  defaultTheme =
  {
    container: 'react-autosuggest__container',
    containerOpen: 'react-autosuggest__container--open',
    input: 'react-autosuggest__input',
    inputOpen: 'react-autosuggest__input--open',
    inputFocused: 'react-autosuggest__input--focused',
    suggestionsContainer: 'react-autosuggest__suggestions-container',
    suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
    suggestionsList: 'react-autosuggest__suggestions-list',
    suggestion: 'react-autosuggest__suggestion',
    suggestionFirst: 'react-autosuggest__suggestion--first',
    suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
    sectionContainer: 'react-autosuggest__section-container',
    sectionContainerFirst: 'react-autosuggest__section-container--first',
    sectionTitle: 'react-autosuggest__section-title'
  };

  render() {
    let {input, className, meta: {touched, error}, placeholder} = this.props;
    let {suggestions} = this.state;
    console.log(error);

    // Inject class
    let inputProps = {
      ...input,
      placeholder,
      className: `${className} ${error && touched ? 'sd-form__input--error'
        : ''}`
    };

    let defaultTheme = this.defaultTheme;

    let theme = {
      ...defaultTheme,
      suggestionsContainer: `${defaultTheme.suggestionsContainer}
        sd-form__suggestions-container`,
      suggestionsList: `${defaultTheme.suggestionsList}
        sd-form__suggestions-list`,
      suggestion: `${defaultTheme.suggest}
        sd-form__suggestions-suggestion`
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onClearRequested.bind(this)}
          renderSuggestion={this.renderSuggestion.bind(this)}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          inputProps={inputProps}
          theme={theme}
        />
        {touched && error && fields.createError(error)}
      </div>
    );
  }
};
