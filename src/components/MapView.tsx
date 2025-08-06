import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvent, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card, Button, List, message } from "antd";
import { usePolygonStore } from "../store/polygon";
import { v4 as uuidv4 } from "uuid";

const INIT_CENTER: [number, number] = [28.6139, 77.2090];

function DrawingLayer() {
  const [drawing, setDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<[number, number][]>([]);
  const { polygons, addPolygon, removePolygon } = usePolygonStore();

  // Add point on left click if drawing
  useMapEvent("click", (e) => {
    if (!drawing) return;
    if (currentPoints.length < 12) {
      setCurrentPoints([...currentPoints, [e.latlng.lat, e.latlng.lng]]);
    } else {
      message.warning("Maximum 12 points per polygon");
    }
  });

  // Right click ends polygon drawing if at least 3 points
  useMapEvent("contextmenu", (e) => {
    if (drawing && currentPoints.length >= 3) {
      addPolygon({ id: uuidv4(), latlngs: currentPoints });
      setDrawing(false);
      setCurrentPoints([]);
      message.success("Polygon created!");
    }
  });

  // Double click also ends polygon drawing if at least 3 points
  useMapEvent("dblclick", (e) => {
    if (drawing && currentPoints.length >= 3) {
      addPolygon({ id: uuidv4(), latlngs: currentPoints });
      setDrawing(false);
      setCurrentPoints([]);
      message.success("Polygon created!");
    }
  });

  // Cancel drawing if needed
  function handleDrawPolygon() {
    setDrawing((on) => {
      if (on) setCurrentPoints([]);
      return !on;
    });
  }

  return (
    <>
      <Button type={drawing ? "primary" : "default"} onClick={handleDrawPolygon} style={{ marginBottom: 10 }}>
        {drawing ? "Cancel Drawing" : "Draw Polygon"}
      </Button>
      {drawing && <span style={{ marginLeft: 8, color: "#999" }}>Click to add points (min 3, max 12). Right or double-click to finish.</span>}
      {/* Currently drawn (incomplete) polygon */}
      {drawing && currentPoints.length > 1 && (
        <Polygon positions={currentPoints} color="#1677ff" />
      )}

      {/* Render all saved polygons */}
      {polygons.map((poly) => (
        <Polygon key={poly.id} positions={poly.latlngs} color="#faad14">
          <Popup>
            Polygon ID: {poly.id.slice(0, 6)}
            <br />
            <Button size="small" danger onClick={() => removePolygon(poly.id)}>
              Delete
            </Button>
          </Popup>
        </Polygon>
      ))}
    </>
  );
}

export const MapView = () => (
  <Card style={{ margin: 16, height: 540 }} title="Interactive Map">
    <div style={{ height: 480 }}>
      <MapContainer
        center={INIT_CENTER}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <DrawingLayer />
      </MapContainer>
    </div>
    {/* List drawn polygons with delete option */}
    <div style={{ marginTop: 8 }}>
      <PolygonList />
    </div>
  </Card>
);

// Separate component to show list and allow deletion
function PolygonList() {
  const { polygons, removePolygon } = usePolygonStore();

  return (
    <List
      header={"Drawn Polygons"}
      size="small"
      bordered
      dataSource={polygons}
      renderItem={item => (
        <List.Item
          actions={[
            <Button danger size="small" onClick={() => removePolygon(item.id)}>
              Delete
            </Button>
          ]}
        >
          ID: {item.id.slice(0, 8)}... | Points: {item.latlngs.length}
        </List.Item>
      )}
    />
  );
}







