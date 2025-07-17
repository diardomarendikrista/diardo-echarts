import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapSection({ title, onTitleClick }) {
  return (
    <div>
      <div
        onClick={onTitleClick}
        className={`top-0 left-0 z-10 bg-white px-2 py-1 text-lg font-bold text-gray-800 ${onTitleClick ? "cursor-pointer hover:text-red-800" : ""}`}
      >
        {title}
      </div>

      <MapContainer
        center={[-2, 120]} // koordinat tengah Indonesia
        zoom={5}
        style={{ height: "450px", width: "100%" }}
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
  );
}
