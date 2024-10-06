import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  APIProvider,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { TextField } from "@mui/material";
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// const API_KEY = "";
interface SelectedLcationProps {
  selectedPlace: google.maps.places.PlaceResult | null;
  setSelectedPlace: (address: any) => void;
}
const SelectLocation = ({
  selectedPlace,
  setSelectedPlace,
}: SelectedLcationProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  console.log(selectedPlace);

  return (
    <APIProvider
      apiKey={API_KEY}
      solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
    >
      <div className="autocomplete-control">
        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      </div>
    </APIProvider>
  );
};

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    let current = inputRef.current.childNodes[1].firstChild;
    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        autoComplete="off"
        fullWidth
        ref={inputRef}
        inputRef={inputRef}
      />
    </div>
  );
};

// const root = createRoot(document.getElementById('app')!);
// root.render(<SelectLocation />);

export default SelectLocation;
