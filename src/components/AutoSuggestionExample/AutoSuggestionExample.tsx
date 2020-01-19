import * as React from 'react';
import {Component} from 'react';

import * as Autosuggest from 'react-autosuggest';
import './AutoSuggestionExample.scss';

interface Language {
  name: string,
  year: number
}

// Imagine you have a list of languages that you'd like to autosuggest.
const languages: Language[] = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C++',
    year: 1978
  },
  {
    name: 'Java',
    year: 1980,
  },
  {
    name: 'JavaScript',
    year: 2020
  },
  {
    name: 'TypeScript',
    year: 2012
  },
  {
    name: 'Elm',
    year: 2012
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string): Language[] => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion: Language) => suggestion.name;

// Use your imagination to render suggestions.
function renderSuggestion(suggestion: Language) {
  return(
  <div>
    {suggestion.name}
  </div>)
};

export class Example extends React.Component<{}, {value: string, suggestions: Language[]}> {
  constructor(props: undefined) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event: React.MouseEvent, { newValue } : {newValue: string}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }: {value: string}) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}