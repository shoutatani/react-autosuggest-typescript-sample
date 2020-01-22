import * as React from "react";
import { useState } from "react";
import { TownNameAutoSuggest } from "./TownNameAutoSuggest/TownNameAutoSuggest";
import "./App.scss";

interface LatLng {
  latitude: number;
  longitude: number;
}

export const App = () => {
  const [latlng, setLatLng] = useState("");

  const onSuggestionClicked = ({ latitude, longitude }: LatLng) => {
    setLatLng(`${latitude.toString()}, ${longitude.toString()}`);
  };

  const onLatLngChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const latLngElement = e.target;
    if (latLngElement.value == "") {

    }
    setLatLng(latLngElement.value);
  };

  const onSuggestionAreaCleared = () => {
    setLatLng("");
  };

  return (
    <div>
      <input
        type="text"
        className={"lat-lng"}
        value={latlng}
        onChange={onLatLngChanged}
      ></input>
      <TownNameAutoSuggest
        onSuggestionClicked={onSuggestionClicked}
        onSuggestionAreaCleared={onSuggestionAreaCleared}
      ></TownNameAutoSuggest>
    </div>
  );
};
