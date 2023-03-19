import React from "react";
import { Stage, Component } from "react-ngl";
import { useMemo } from "react";
export default function s({path}) {
  const reprList = useMemo(
    () => [
      {
        type: "ball+stick",
      },
    ],
    []
  );

  console.log(reprList);
  return (
    <>
      <Stage width="600px" height="400px">
        <Component path={path} reprList={reprList} />
      </Stage>
    </>
  );
}
