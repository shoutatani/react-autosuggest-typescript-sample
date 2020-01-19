import * as React from "react";
import { useState } from "react";
import { TownNameAutoSuggest } from "./TownNameAutoSuggest/TownNameAutoSuggest";
import "./App.scss";

interface LatLng {
  latitude: number;
  longitude: number;
}

export const App = () => {
  const [latlng, setLatLng] = useState<LatLng>({ latitude: 0, longitude: 0 });

  const onSuggestionClicked = ({ latitude, longitude }: LatLng) => {
    setLatLng({ latitude: latitude, longitude: longitude });
  };

  return (
    <div>
      <input
        type="text"
        className={"lat-lng"}
        value={
          latlng && latlng.latitude != 0 && latlng.longitude != 0
            ? `${latlng.latitude}, ${latlng.longitude}`
            : ""
        }
        readOnly
      ></input>
      <TownNameAutoSuggest
        onSuggestionClicked={onSuggestionClicked}
      ></TownNameAutoSuggest>
    </div>
  );
};
