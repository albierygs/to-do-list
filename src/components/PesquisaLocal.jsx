import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";

import styleInput from '../styles/adicionar.module.css'
import style from '../styles/pesquisaLocal.module.css'
import { MapPinned } from "lucide-react";
import pinIcon from '../assets/pin_map.png'
import { useFormContext } from "react-hook-form";


const customPinIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});


const PesquisaLocal = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  const suggestionsRef = useRef(null);

  const { register, setValue } = useFormContext()

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (location) => {
    setSelectedLocation({
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
      displayName: location.display_name,
    });
    setValue('location.name', location.display_name)
    setValue('location.coordinates', [parseFloat(location.lat), parseFloat(location.lon)])
    setSearch(location.display_name);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        try {
          // Chamada à API de geocodificação reversa
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
  
          const displayName = response.data.display_name || `Lat: ${lat}, Lon: ${lng}`;
  
          setSelectedLocation({ lat, lon: lng, displayName });
          setValue('location.name', displayName)
          setValue('location.coordinates', [lat, lng])
          setSearch(displayName);
        } catch (error) {
          console.error("Erro na geocodificação reversa:", error);
          setSearch(`Lat: ${lat}, Lon: ${lng}`);
        }
      },
    });
    return null;
  };

  return (
    <div>
      <div className={style.searchContainer}>
        <label>Local</label>
        <input
          className={styleInput.inputComIcone}
          type="text"
          placeholder="Buscar local..."
          value={search}
          {...register('location.name')}
          onChange={handleSearchChange}
        />
        <button onClick={(e) => {
          e.preventDefault()
          setMapVisible(!mapVisible)
        }}>
          <MapPinned />
        </button>
        {suggestions.length > 0 && (
          <ul className={style.suggestions} ref={suggestionsRef}>
          {suggestions.map((location, index) => (
            <li key={index} onClick={() => handleSuggestionClick(location)}>
              {location.display_name}
            </li>
          ))}
        </ul>
        )}
      </div>
      {mapVisible && (
        <div className={style.mapContainer}>
          <MapContainer
            center={[selectedLocation?.lat || 0, selectedLocation?.lon || 0]}
            zoom={selectedLocation ? 14 : 2}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedLocation && (
              <Marker 
                position={[selectedLocation.lat, selectedLocation.lon]} 
                icon={customPinIcon}
              />
            )}
            <MapClickHandler />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default PesquisaLocal
