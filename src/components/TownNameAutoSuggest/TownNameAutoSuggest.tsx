import * as React from "react";

import * as Autosuggest from "react-autosuggest";
import "./TownNameAutoSuggest.scss";

import * as data from "../../assets/geo_data/geo_data.json";

interface TownProps {
  onSuggestionClicked({}: {latitude: number, longitude: number}): void;
}

interface TownState {
  value: string,
  suggestions: Town[]
}

interface Town {
  name: string;
  latitude: string;
  longitude: string;
}

const Towns: Town[] = data.towns;

const getSuggestions = (value: string): Town[] => {
  const inputValue = value.trim();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : Towns.filter(town => town.name.includes(inputValue));
};

const getSuggestionValue = (town: Town) => town.name;

const renderSuggestion = (town: Town) => {
  return <div>{town.name}</div>;
};

export class TownNameAutoSuggest extends React.Component<
  TownProps,
  TownState
> {
  constructor(props: TownProps) {
    super(props);

    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event: React.MouseEvent, { newValue }: { newValue: string }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected(event: any, { suggestion }: {suggestion :Town}) {
    this.props.onSuggestionClicked({latitude: Number(suggestion.latitude), longitude: Number(suggestion.longitude)});
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "都道府県名、もしくは市区町村名を入力してください。",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
