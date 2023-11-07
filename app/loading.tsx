"use client";

import React from "react";
import { Center, Flex, Text } from "@chakra-ui/react";

export default function loading() {
  return (
    <>
      <Flex w={"100%"} h={"100vh"} justifyContent={"center"}>
        <Center>
          <Text>loading...</Text>
        </Center>
      </Flex>
    </>
  );
}
