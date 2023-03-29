import React from "react";
import { useState, useEffect } from "react";
import { Flex, Text, Input, Button } from "@chakra-ui/react";

import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();

  const [fileUrl, setFileUrl] = useState("");

  const [route, setRoute] = useState("");

  const [flag, setFlag] = useState(false);

  function generateRandomId() {
    const length = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  function generateId() {
    const length = 10;
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  async function uploadPdbToDb(id, pdb, randomStr) {
    try {
      const response = await fetch("/api/addPdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          pdb,
          randomStr,
        }),
      });
      const result = await response.json();
      setRoute(randomStr);
      console.log("Success:", result);
      setFlag(true);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  useEffect(() => {
    router.push(`/${route}`);
  }, [route, flag]);

  return (
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

        <Flex flexDir={"column"} gap={"10px"} w={"600px"}>
          <Input
            placeholder="Enter url"
            onChange={(e) => setFileUrl(e.target.value)}
          />
          <Button
            onClick={() => {
              uploadPdbToDb(generateId(), fileUrl, generateRandomId());
            }}
          >
            submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
