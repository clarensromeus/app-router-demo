"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  children: React.ReactNode;
  session: Session;
};

export default function Provider({ children, session }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
