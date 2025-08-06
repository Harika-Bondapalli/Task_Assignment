Dashboard Meteo 
An interactive dashboard to draw polygons on a map, select weather data variables and dates, and fetch real-time weather data from the Open-Meteo API. Supports multiple polygons, variable comparison, and easy extension with charts or advanced visualization.

Features
Draw Polygons:
Use the map to draw, list, select, and delete multiple polygons.

Sidebar Weather Selection:
Choose between variables like Temperature, Precipitation, or Wind.

Date Picker/Timeline:
Pick a date to see hourly weather for that day.

Live Weather Fetch:
Requests data from Open-Meteo for your selected polygons, variable, and date.

Multi-Polygon Comparison:
Select several polygons for comparative data fetching and viewing.

Responsive UI:
Modern interface with Ant Design, React-Leaflet, Zustand, and TypeScript.

Screenshots
Screenshots of the working dashboard are available in the src/assets folder.

Tech Stack
React
TypeScript
Ant Design
React-Leaflet
Zustand
Open-Meteo API
Vercel (deployed)

Demo
Live deployment on Vercel:

https://task-assignment-five.vercel.app/

Setup & Run Locally
Clone the repo:
git clone https://github.com/USERNAME/dashboard-meteo.git
cd dashboard-meteo
Install dependencies:
npm install
Run the app in development mode:
npm start
App runs at http://localhost:3000.

Build for production:
npm run build
Deploy to vercel:

Connect GitHub repo in vercel > Import Project

Build command: npm run build

Publish directory: build




How To Use
Draw polygons on the map.

Select variables in the sidebar.

Pick a date via the date picker/timeline.

Select polygons via checkboxes for data comparison.

View hourly weather data fetched instantly from Open-Meteo.

Including Screenshots
Dashboard output screenshots are stored in /src/assets.

You may refer to them in documentation or presentations.

By -- Harika Bondapalli

