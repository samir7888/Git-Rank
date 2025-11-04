"use client";
import * as React from "react";
import { RadarChart } from "@mui/x-charts/RadarChart";

function valueFormatter(v: number | null) {
  return v === null ? "NaN" : `${v.toLocaleString()}`;
}

interface MultiSeriesRadarProps {
  user1Label?: string | null;
  user2Label?: string | null;
  user1Data: number[];
  user2Data: number[];
}

export default function MultiSeriesRadar({
  user1Label,
  user2Label,
  user1Data,
  user2Data,
}: MultiSeriesRadarProps) {
  if (user1Data.length !== 4 || user2Data.length !== 4) return null;

  return (
    <RadarChart
      height={300}
      width={500}
      series={[
        { label: user1Label || "User 1", data: user1Data, valueFormatter },
        { label: user2Label || "User 2", data: user2Data, valueFormatter },
      ]}
      radar={{
        metrics: ["Followers", "Following", "Gists", "Repos"],
      }}
    />
  );
}
