import React, { useState } from "react";
import { Row, Col, DatePicker } from "antd";
import { Sidebar } from "./components/Sidebar";
import { MapView } from "./components/MapView";
import { WeatherDataDisplay } from "./components/WeatherDataDisplay";
import dayjs, { Dayjs } from "dayjs";
import { TimelineSlider } from "./components/TimelineSlider";
export default function App() {
  // Use today's date as initial value for demonstration
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  return (
    <Row gutter={24}>
      <Col xs={24} md={61}>
        <TimelineSlider />
      </Col>
      <Col xs={24} md={61}>
        <Sidebar />
        <DatePicker
          style={{ marginTop: 16 }}
          value={dayjs(selectedDate)}
          onChange={d => {
            if (d) setSelectedDate(d.format("YYYY-MM-DD"));
          }}
          format="YYYY-MM-DD"
        />
        <WeatherDataDisplay date={selectedDate} />
      </Col>
      <Col xs={24} md={48}>
        <MapView />
      </Col>
    </Row>
  );
}





