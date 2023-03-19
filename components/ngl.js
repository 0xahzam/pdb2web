import React from "react";
import { Stage, Component } from "react-ngl";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Flex, Select } from "@chakra-ui/react";

export default function Ngl({ path }) {
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
      <Flex
        width={"610px"}
        bg={"black"}
        flexDir={"column"}
        borderRadius={"7px"}
        align={"center"}
        color={"white"}
      >
        <Stage width="600px" height="400px">
          <Component path={path} reprList={reprLists[reprName]} />
        </Stage>

        <Select
          name="representation"
          value={reprName}
          onChange={handleReprChange}
          border={"none"}
          focusBorderColor={"none"}
        >
          {Object.keys(reprLists).map((name) => (
            <option key={name} value={name} style={{ color: "black" }}>
              {name}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  );
}
