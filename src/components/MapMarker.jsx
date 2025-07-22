import { useRef } from "react";
import { Marker, Popup } from "react-leaflet";

export default function MapMarker({ data }) {
  const markerRef = useRef();

  return (
    <Marker
      position={[data.lat, data.lon]}
      ref={markerRef}
      eventHandlers={{
        mouseover: () => {
          const marker = markerRef.current;
          if (marker) {
            marker.openPopup();
          }
        },
        mouseout: () => {
          const marker = markerRef.current;
          if (marker) {
            marker.closePopup();
          }
        },
      }}
    >
      <Popup closeButton={false}>
        <div className="font-mono">
          <div className="flex gap-1">
            <div className="w-12 text-right">LAT</div>
            <div>:</div>
            <div>{data.lat}</div>
          </div>
          <div className="flex gap-1">
            <div className="w-12 text-right">LON</div>
            <div>:</div>
            <div>{data.lon}</div>
          </div>
          <div className="flex gap-1">
            <div className="w-12 text-right">Kota</div>
            <div>:</div>
            <div>{data.name}</div>
          </div>
          <div className="flex gap-1">
            <div className="w-12 text-right">Count</div>
            <div>:</div>
            <div>{data.count}</div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
