import React, { useState } from "react";
import { FaQuestionCircle, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveButton from "../../../commons/SaveButton";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "../../../commons/ToastProvider";

function RadiusCircle({ center, radius }) {
  return <Circle center={center} radius={radius} />;
}

function getZoomLevel(radius) {
  // Simple zoom level calculation based on radius
  if (radius < 500) return 15;
  if (radius < 1000) return 14;
  if (radius < 5000) return 13;
  return 12;
}

function LocationTab() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [radiusValue, setRadiusValue] = useState(500);
  const [locationData, setLocationData] = useState({
    latitude: 14.599512,
    longitude: 120.984222,
  });

  const handleSaveLocation = () => {
    console.log("Location settings saved:", {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      radius: radiusValue,
    });
    toast.success("Location settings saved!");
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-row justify-between gap-4 md:gap-6 items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-shrink-0 flex items-center text-gray-900 dark:text-gray-100 text-md bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md shadow-md select-none border border-gray-300 dark:border-gray-600 whitespace-nowrap">
          <span>Location Details</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 border border-primary dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 w-fit">
            <FaQuestionCircle className="text-primary mt-0.5 text-lg flex-shrink-0" />
            <span className="hidden sm:inline leading-snug">
              Add store location details to identify customer orders which are
              inside the store radius area
            </span>
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <SaveButton onClick={handleSaveLocation} />
        </div>
      </div>

      {/* Location Toggle */}
      <div className="flex items-center justify-between px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md mb-6 max-w-90">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400">
            Enable location details
          </span>
          <FaQuestionCircle className="text-primary text-sm" />
        </div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={locationEnabled}
            onChange={() => setLocationEnabled(!locationEnabled)}
          />
          <div className="relative w-12 h-4 overflow-visible">
            {/* Track background */}
            <div
              className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                locationEnabled
                  ? "bg-primary/20"
                  : "bg-gray-400 dark:bg-gray-700"
              }`}
            ></div>

            {/* Thumb (circle) - White when left, primary when right */}
            <div
              className={`absolute -top-[6px] ${
                locationEnabled
                  ? "left-[26px] bg-primary border-primary/50"
                  : "left-0 bg-white border-gray-100 shadow-lg"
              } w-7 h-7 rounded-full border transform transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]`}
            ></div>
          </div>
        </label>
      </div>

      {/* Location Details Form */}
      {locationEnabled && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Location Details */}
          <div className="space-y-4">
            <button className="flex items-center justify-center gap-2 text-secondary px-3 py-2 rounded-md hover:bg-secondary-dark/10 dark:hover:bg-secondary-dark/20 transition-all cursor-pointer w-full border border-primary hover:border-primary-dark hover:shadow-sm">
              <FaMapMarkerAlt className="text-primary" />
              Get Current Location
            </button>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 space-y-4">
              {/* Latitude and Longitude */}
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 px-3 py-2 rounded-md">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Latitude
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {locationData.latitude}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 px-3 py-2 rounded-md">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Longitude
                  </span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {locationData.longitude}
                  </span>
                </div>
              </div>

              {/* Radius */}
              <div className="flex items-center focus-within:border-primary dark:focus-within:border-primary border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label className="w-2/4 px-6 py-2.5 text-sm font-semibold bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-r border-gray-300 dark:border-gray-600 flex items-center gap-2">
                  Radius <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="radius"
                  value={radiusValue}
                  onChange={(e) => setRadiusValue(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 focus:outline-none"
                  placeholder="Enter radius"
                  required
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-md text-gray-700 dark:text-gray-300">
                <FaQuestionCircle className="text-primary" />
                <span>Radius in meter (1 Meter = 3.28 Feet)</span>
              </div>
            </div>
          </div>

          {/* Right Side - Map */}
          <div>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 mb-4">
              <FaQuestionCircle className="text-primary" />
              <span>Use the interactive map to set your location</span>
            </div>

            <MapContainer
              center={[locationData.latitude, locationData.longitude]}
              zoom={getZoomLevel(radiusValue)}
              scrollWheelZoom={false}
              className="h-64 w-full rounded-md border border-gray-300 dark:border-gray-600"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <RadiusCircle
                center={[locationData.latitude, locationData.longitude]}
                radius={radiusValue}
              />
            </MapContainer>
          </div>
        </div>
      )}
      <ToastProvider />
    </div>
  );
}

export default LocationTab;
