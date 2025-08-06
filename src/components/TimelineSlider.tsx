import React, { useMemo } from "react";
import { Range, getTrackBackground } from "react-range";
import { useTimelineStore } from "../store/timeline";
import dayjs from "dayjs";
import { Card, Typography, Switch } from "antd";

const HOURS_RANGE = 24 * 30; // 30 days (720 hours)
const now = dayjs().startOf('hour');

type SliderMode = 'single' | 'range';

export const TimelineSlider: React.FC = () => {
  const [mode, setMode] = React.useState<SliderMode>('single');
  const { range, setRange } = useTimelineStore();

  // Calculate time window: 15 days before/after 'now'
  const startDate = useMemo(() => now.subtract(15, "day"), []);
  const hours = useMemo(
    () => Array.from({ length: HOURS_RANGE }, (_, i) => startDate.add(i, "hour")),
    [startDate]
  );

  return (
    <Card style={{ margin: 16 }}>
      <Typography.Title level={5}>
        Timeline ({mode === "single" ? "Single Hour" : "Hour Range"})
      </Typography.Title>
      <Switch
        checkedChildren="Range"
        unCheckedChildren="Single"
        checked={mode === "range"}
        onChange={checked => setMode(checked ? "range" : "single")}
        style={{ marginBottom: 8 }}
      />
      <Range
        step={1}
        min={0}
        max={HOURS_RANGE - 1}
        values={mode === "single" ? [range[0]] : range}
        onChange={(values) => {
          setRange(
            mode === "single"
              ? [values[0], values[0]]
              : [values[0], values[1]]
          );
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "8px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: mode === "single" ? [range[0]] : range,
                  colors: ["#52c41a", "#e9ecef", "#1677ff"],
                  min: 0,
                  max: HOURS_RANGE - 1,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "24px",
              width: "24px",
              backgroundColor: "#1890ff",
              borderRadius: "50%",
              boxShadow: "0px 2px 6px #AAA",
              border: "2px solid #fff",
            }}
          />
        )}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span>{hours[0].format('YYYY-MM-DD')}</span>
        <span>{hours[HOURS_RANGE - 1].format('YYYY-MM-DD')}</span>
      </div>
      <Typography.Text style={{ marginTop: 8, display: "block" }}>
        Selected:{" "}
        {mode === "single"
          ? hours[range[0]].format("YYYY-MM-DD HH:00")
          : `${hours[range[0]].format("YYYY-MM-DD HH:00")} — ${hours[range[1]].format("YYYY-MM-DD HH:00")}`}
      </Typography.Text>
    </Card>
  );
};
