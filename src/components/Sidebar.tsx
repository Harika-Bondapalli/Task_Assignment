import React from "react";
import { Card, Radio, Space } from "antd";
import { useSidebarStore } from "../store/sidebar";

// Variables you support (extend as needed)
const VARIABLES = [
  { value: "temperature_2m", label: "Temperature (2m)" },
  { value: "precipitation", label: "Precipitation" },
  { value: "windspeed_10m", label: "Wind Speed (10m)" },
  // Add more Open-Meteo variables...
];

export function Sidebar() {
  const { selectedVariable, setSelectedVariable } = useSidebarStore();

  return (
    <Card title="Weather Data Variable" style={{ marginBottom: 16 }}>
      <Radio.Group
        value={selectedVariable}
        onChange={e => setSelectedVariable(e.target.value)}
      >
        <Space direction="vertical">
          {VARIABLES.map((v) => (
            <Radio key={v.value} value={v.value}>
              {v.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
}
