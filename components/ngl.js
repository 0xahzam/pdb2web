import React from "react";
import { Stage, Component } from "react-ngl";
import { useMemo, useState, useCallback } from "react";
export default function s({ path }) {
  const [reprName, setReprName] = useState("cartoon");
  const reprLists = useMemo(
    () => ({
      "ball+stick": [
        {
          type: "ball+stick",
        },
      ],
      cartoon: [
        {
          type: "cartoon",
        },
      ],
      "ribbon and line": [
        {
          type: "ribbon",
          param: {
            color: "atomindex",
          },
        },
        {
          type: "line",
          param: {
            color: "element",
          },
        },
      ],
      spacefill: [
        {
          type: "spacefill",
          param: {
            color: "element",
          },
        },
      ],
      surface: [
        {
          type: "surface",
          param: {
            color: "element",
          },
        },
      ],
    }),
    []
  );
  const handleReprChange = useCallback(
    (event) => setReprName(event.target.value),
    []
  );

  return (
    <>
      <Stage width="600px" height="400px">
        <Component path={path} reprList={reprLists[reprName]} />
      </Stage>
      <select
        name="representation"
        value={reprName}
        onChange={handleReprChange}
      >
        {Object.keys(reprLists).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
}
