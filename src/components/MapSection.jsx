import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapSection2 from "components/MapSection2";
import { useState } from "react";

export default function MapSection({ title, onTitleClick }) {
  const [type, setType] = useState("leaflet");

  return (
    <div>
      <div
        onClick={onTitleClick}
        className={`top-0 left-0 z-10 bg-white px-2 py-1 text-lg font-bold text-gray-800 ${onTitleClick ? "cursor-pointer hover:text-red-800" : ""}`}
      >
        {title}
      </div>

      <div className={`${type === "json" ? "hidden" : ""}`}>
        <MapContainer
          key={type}
          center={[-2, 120]} // koordinat tengah Indonesia
          zoom={5}
          style={{
            height: "450px",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[-6.2, 106.8]}>
            <Popup>DKI Jakarta</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={`${type === "leaflet" ? "hidden" : ""}`}>
        <MapSection2 />
      </div>

      <div className="flex gap-2">
        Tipe Map:
        <div
          className={`${type === "leaflet" ? "bg-red-700 text-white" : "bg-red-300 text-black"} px-5 rounded-md cursor-pointer`}
          onClick={() => setType("leaflet")}
        >
          Leaflet
        </div>
        <div
          className={`${type === "json" ? "bg-red-700 text-white" : "bg-red-300 text-black"} px-5 rounded-md cursor-pointer`}
          onClick={() => setType("json")}
        >
          JSON ECHARTS
        </div>
      </div>
    </div>
  );
}
