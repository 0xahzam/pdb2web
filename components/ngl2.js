import React, { useEffect, useState } from "react";
import { Stage, ColormakerRegistry } from "ngl";

export default function NglViewer({ path, color, substr, str }) {
  var ind;

  function findSubstringIndices(str, substr) {
    const startIndex = str.indexOf(substr);
    if (startIndex === -1) {
      // substring not found
      return null;
    }
    const endIndex = startIndex + substr.length - 1;
    ind = startIndex + "-" + endIndex;
  }

  useEffect(() => {
    findSubstringIndices(str.split("\n")[1], substr);
    console.log(ind)
  }, [str, substr]);

  var czr = color;

  useEffect(() => {
    const stage = new Stage("viewport");
    var schemeId = ColormakerRegistry.addSelectionScheme([[czr, ind]]);

    stage.loadFile(path).then(function (component) {
      component.addRepresentation("ball+stick", { color: schemeId }); // pass schemeId here
      component.autoView();
      // console.log(component.structure.atomCount);
    });

    return () => {
      stage;
    };
  }, [path]);

  return <div id="viewport" style={{ width: "610px", height: "400px" }} />;
}
