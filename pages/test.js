
import React, { useState } from "react";

export default function test() {
  const [fileImg, setFileImg] = useState(null);
  const [fileContent, setFileContent] = useState("");

  function handleFileRead(e) {
    const content = e.target.result;
    setFileContent(content);
  }

  function handleFileChosen(file) {
    setFileImg(file);
    const reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(file);
  }

  return (
    <div>
      <input
        id="myBtn"
        type="file"
        onChange={(e) => handleFileChosen(e.target.files[0])}
        accept=".pdb"
      />
      <p>File content: {fileContent}</p>
    </div>
  );
}
