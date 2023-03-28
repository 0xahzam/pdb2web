import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex, Spinner, Text, Button, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMemo } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Structure = dynamic(
  () => {
    return import("../components/ngl");
  },
  { ssr: false }
);

const StructureCol = dynamic(
  () => {
    return import("../components/ngl2");
  },
  { ssr: false }
);

var userArr = [];

export default function Protein() {
  const router = useRouter();
  const { id } = router.query;
  const [auth, setAuth] = useState(false);
  const idArr = [];

  const [result, setResult] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedText, setSelectedText] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [name, setName] = useState("");

  const [fileUrl, setFileUrl] = useState("");
  const [fileContent, setFileContent] = useState("");

  const [fasta, setFasta] = useState("");
  const [pdb, setPdb] = useState("");

  const [flag, setFlag] = useState(false);
  const [tempselectedText, setTempselectedText] = useState("");
  const [tempselectedColor, setTempselectedColor] = useState("");

  async function fetchAll() {
    try {
      const response = await fetch("/api/getPdb");
      const result = await response.json();
      setResult(result);
      result.map((e) => {
        idArr.push(e.randomStr);
      });

      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  async function fetchUsers() {
    try {
      const response = await fetch("/api/getUser");
      const result = await response.json();
      result.map((e) => {
        if (e.randSt === id) {
          userArr.push(e);
        }
        console.log(userArr);
      });
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  async function getUsers() {
    userArr = [];
    await fetchUsers();
    function removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    }
    removeDuplicates(userArr);
  }

  useEffect(() => {
    async function main() {
      await fetchAll();
      idArr.includes(id) ? setAuth(true) : setAuth(false);
      if (auth) {
        result.map((e) => {
          e.randomStr === id ? setFileUrl(e.pdb) : "";
        });
      }
    }

    main();
  }, [idArr]);

  function handleFileRead(e) {
    const content = e.target.result;
    setFileContent(content);
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

  async function getPdbData(url) {
    const response = await fetch(url);
    const text = await response.text();
    pdbToFASTA(text);
  }

  async function UserToDb(username, color, selection, randSt) {
    try {
      const response = await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          color,
          selection,
          randSt,
        }),
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  useEffect(() => {
    getPdbData(fileUrl);
  }, [fileUrl]);

  return (
    <>
      {!auth ? (
        <Flex h={"100vh"} justify={"center"} align={"center"}>
          <Spinner size={"lg"} />
        </Flex>
      ) : (
        <Flex
          minH={"100vh"}
          bg={"white"}
          color={"black"}
          justify={"center"}
          ml={"40px"}
          mt={"40px"}
          mb={"40px"}
          gap={"120px"}
        >
          <Flex flexDir={"column"} gap={"10px"}>
            <Text fontSize={"24px"}>pdb2web🧬</Text>
            <motion.div
              initial={{ y: "10%", opacity: "0" }}
              animate={{ y: "0", opacity: "100%" }}
              transition={{ delay: "0.35" }}
            >
              {flag ? (
                <Flex flexDir={"column"} gap={"10px"}>
                  <StructureCol
                    path={fileUrl}
                    color={tempselectedColor}
                    substr={tempselectedText}
                    str={fasta}
                  />

                  <Button onClick={onOpen}>Annotate</Button>

                  <Text w={"610px"}>
                    {(() => {
                      const index = fasta.indexOf(tempselectedText);
                      const before = fasta.slice(0, index);
                      const after = fasta.slice(
                        index + tempselectedText.length
                      );

                      const s = before + tempselectedText + after;

                      return (
                        <span>
                          {before}
                          <span style={{ color: tempselectedColor }}>
                            {tempselectedText}
                          </span>
                          {after}
                        </span>
                      );
                    })()}
                  </Text>
                </Flex>
              ) : (
                <Flex flexDir={"column"} gap={"10px"}>
                  <Structure path={fileUrl} />
                  <Button onClick={onOpen}>Annotate</Button>
                  <Text w={"610px"}>{fasta}</Text>
                </Flex>
              )}
            </motion.div>
          </Flex>

          <Flex flexDir={"column"} gap={"20px"}>
            <Text fontSize={"21px"} onClick={getUsers} cursor={"pointer"}>
              Annotation History ⏳ (click to load)
            </Text>
            <hr />
            <Text
              fontSize={"19px"}
              onClick={() => setFlag(false)}
              cursor={"pointer"}
            >
              Reset ↺
            </Text>
            <hr />
            {userArr.map((item) => (
              <Flex
                key={item.id}
                flexDirection={"column"}
                gap={"10px"}
                bg={"rgba(0,0,0,0.05)"}
                p={"15px"}
                onClick={() => {
                  setFlag(true);
                  setTempselectedColor(item.color);
                  setTempselectedText(item.selection);
                }}
                border={
                  flag && item.color == tempselectedColor
                    ? "0.5px solid black"
                    : ""
                }
                cursor={"pointer"}
              >
                <Flex gap={"10px"} align={"center"}>
                  <Text fontSize={"19px"}> → {item.username}</Text>
                  <Flex height={"20px"} width={"100px"} bg={`${item.color}`} />
                </Flex>
                <Text w={"400px"}>{item.selection}</Text>
              </Flex>
            ))}
          </Flex>

          <Drawer isOpen={isOpen} onClose={onClose} size={"lg"}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Select sequence & color</DrawerHeader>

              <DrawerBody>
                <Input
                  mt={"20px"}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Flex
                  mt={"20px"}
                  height={"200px"}
                  width={"100%"}
                  overflow={"scroll"}
                  overflowX={"hidden"}
                >
                  <Text w={"100%"}>{fasta}</Text>
                </Flex>

                <Flex mt={"20px"} gap={"20px"}>
                  <Input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  />
                  <Button
                    onMouseUp={() => {
                      if (window.getSelection) {
                        setSelectedText(window.getSelection().toString());
                      }
                    }}
                  >
                    Get Selection
                  </Button>
                </Flex>

                <Text w={"600px"} mt={"20px"} fontSize={"21px"}>
                  Result:{" "}
                  <span style={{ color: `${selectedColor}` }}>
                    {selectedText}
                  </span>{" "}
                </Text>
                <Button
                  mt={"20px"}
                  onClick={() => {
                    // let data = {
                    //   username: name,
                    //   color: selectedColor,
                    //   selection: selectedText,
                    //   randSt: id,
                    // };
                    UserToDb(name, selectedColor, selectedText, id);
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      )}
    </>
  );
}
