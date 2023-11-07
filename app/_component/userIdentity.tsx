"use client";

import React from "react";
import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function UserIdentity() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
  }
  return <Text color={"gray.500"}>{session?.user.email}</Text>;
}
