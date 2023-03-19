import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
const Structure = dynamic(
  () => {
    return import("../components/ngl");
  },
  { ssr: false }
);
export default function index() {
  const [fileImg, setFileImg] = useState(null); // storing file data
  useEffect(() => {
    console.log(fileImg);
  }, [fileImg]);

  return (
    <div>
      input a file <br />
      <input type="file" onChange={(e) => setFileImg(e.target.files[0])} />
      {fileImg == null ? "" : <Structure path={fileImg} />}
    </div>
  );
}
