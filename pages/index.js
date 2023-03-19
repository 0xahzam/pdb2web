import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Flex, Text, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Structure = dynamic(
  () => {
    return import("../components/ngl");
  },
  { ssr: false }
);

export default function Index() {
  const [fileImg, setFileImg] = useState(null); // storing file data

  const [fileContent, setFileContent] = useState("");
  const [fasta, setFasta] = useState(""); // storing file data

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

  const AminoAcids = {
    ALA: "A",
    ARG: "R",
    ASN: "N",
    ASP: "D",
    CYS: "C",
    GLU: "E",
    GLN: "Q",
    GLY: "G",
    HIS: "H",
    ILE: "I",
    LEU: "L",
    LYS: "K",
    MET: "M",
    PHE: "F",
    PRO: "P",
    SER: "S",
    THR: "T",
    TRP: "W",
    TYR: "Y",
    VAL: "V",
  };

  const pdbToFASTA = (pdbText) => {
    let fastaText = "";
    const lines = typeof pdbText === "string" ? pdbText.split("\n") : "";

    let currentChain = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("ATOM")) {
        const chain = line[21];
        if (chain !== currentChain) {
          fastaText += `>${chain}\n`;
          currentChain = chain;
        }
        const resName = line.substr(17, 3).trim();
        fastaText += AminoAcids[resName] || "X";
      } else if (line.startsWith("TER")) {
        currentChain = null;
        fastaText += "\n";
      }
    }
    setFasta(fastaText);
  };

  useEffect(() => {
    pdbToFASTA(fileContent);
  }, [fileContent]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      bg={"white"}
      color={"black"}
      flexDir={"column"}
      justify={"center"}
    >
      <Flex flexDir={"column"} gap={"10px"} mt={"40px"} mb={"40px"}>
        <Flex flexDir={"column"} gap={"10px"}>
          <Text fontSize={"24px"}>pdb2web🧬</Text>
          <input
            id="myBtn"
            type="file"
            onChange={(e) => handleFileChosen(e.target.files[0])}
            accept=".pdb"
          />
        </Flex>
        {fileImg == null ? (
          ""
        ) : (
          <motion.div
            initial={{ y: "10%", opacity: "0" }}
            animate={{ y: "0", opacity: "100%" }}
            transition={{ delay: "0.35" }}
          >
            <Flex flexDir={"column"} gap={"10px"}>
              <Structure path={fileImg} />
              <Text w={"610px"}>{fasta}</Text>
            </Flex>
          </motion.div>
        )}
      </Flex>
    </Flex>
  );
}
