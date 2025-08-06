import React, { useEffect, useState } from "react";
import { usePolygonStore } from "../store/polygon";
import { useSidebarStore } from "../store/sidebar";
import { fetchWeather } from "../api/meteo";

type WeatherDataDisplayProps = {
  date: string; // "YYYY-MM-DD"
};

type HourlyData = {
  time: string[];
  [variable: string]: number[] | string[];
};

type WeatherResponse = {
  hourly?: HourlyData;
  error?: string;
} | null;

export function WeatherDataDisplay({ date }: WeatherDataDisplayProps) {
  const { polygons } = usePolygonStore();
  const { selectedVariable } = useSidebarStore();
  const [data, setData] = useState<WeatherResponse>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (polygons.length === 0 || !selectedVariable) return;
    const poly = polygons[0];
    const lat = poly.latlngs.reduce((sum, p) => sum + p[0], 0) / poly.latlngs.length;
    const lon = poly.latlngs.reduce((sum, p) => sum + p[1], 0) / poly.latlngs.length;
    setLoading(true);
    fetchWeather({ lat, lon, variable: selectedVariable, date })
      .then(setData)
      .catch((e) => setData({ error: e.message }))
      .finally(() => setLoading(false));
  }, [polygons, selectedVariable, date]);

  if (loading) return <div>Loading weather data...</div>;
  if (!data) return <div>No data to display.</div>;
  if (data.error) return <div>Error: {data.error}</div>;

  return (
    <div>
      <h4>Weather Data for Polygon</h4>
      <ul>
        {data.hourly && data.hourly[selectedVariable] && Array.isArray(data.hourly.time) &&
          (data.hourly[selectedVariable] as number[]).map((value, idx) => (
            <li key={idx}>
              Hour {data.hourly!.time[idx]}: {value}
            </li>
          ))
        }
      </ul>
    </div>
  );
}


