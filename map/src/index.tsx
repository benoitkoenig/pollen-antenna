import { memo, useState } from "react";

import type { Subdivision } from "./types";

const Map = memo(function Map({
  subdivisions,
}: {
  subdivisions: Subdivision[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate bounds for viewBox
  const allCoordinates = subdivisions.flatMap((sub) =>
    sub.coordinates.flatMap((polygon) => polygon),
  );

  if (allCoordinates.length === 0) {
    return null;
  }

  const lngs = allCoordinates.map((coord) => coord[0]);
  const lats = allCoordinates.map((coord) => coord[1]);

  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  const width = maxLng - minLng;
  const height = maxLat - minLat;

  // Add padding (10% on each side)
  const padding = 0.1;
  const viewBox = `${minLng - width * padding} ${minLat - height * padding} ${
    width * (1 + 2 * padding)
  } ${height * (1 + 2 * padding)}`;

  return (
    <svg
      viewBox={viewBox}
      className="w-full h-full border-gray-400"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="scale(1, -1)">
        {subdivisions.map((subdivision) => (
          <g key={subdivision.id}>
            {subdivision.coordinates.map((polygon, idx) => {
              const points = polygon
                .map((coord) => `${coord[0]},${-coord[1]}`)
                .join(" ");

              const isHovered = hoveredId === subdivision.id;

              return (
                <polygon
                  key={idx}
                  points={points}
                  fill={isHovered ? "#4a90e2" : "#e0e0e0"}
                  stroke="#333"
                  strokeWidth={width * 0.001}
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s ease",
                  }}
                  onMouseEnter={() => setHoveredId(subdivision.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
});

export default Map;
