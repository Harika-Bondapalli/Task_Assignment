/**
 * Fetches weather data for a location and variable from Open-Meteo API.
 * @param lat Latitude of location
 * @param lon Longitude of location
 * @param variable Weather variable, e.g. 'temperature_2m'
 * @param date String YYYY-MM-DD, e.g. '2025-08-06'
 */
export async function fetchWeather({
  lat,
  lon,
  variable,
  date,
}: {
  lat: number;
  lon: number;
  variable: string;
  date: string;
}) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=${variable}&start_date=${date}&end_date=${date}&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("API failed");
  return res.json();
}

