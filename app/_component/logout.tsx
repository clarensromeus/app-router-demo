"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogOut() {
  return (
    <Button onClick={() => signOut()} variant={"solid"} colorScheme={"red"}>
      LogOut
    </Button>
  );
}
