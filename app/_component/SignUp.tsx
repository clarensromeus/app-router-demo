"use client";

import React from "react";
import {
  Link,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import nextLink from "next/link";
import { z } from "zod";
import SignUpValidation from "@/app/_lib/signup";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  type formData = z.infer<typeof SignUpValidation>;

  const ID = React.useId();

  const router = useRouter();

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
    },
    resolver: zodResolver(SignUpValidation),
  });

  const onSubmit = async (data: formData) => {
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return (
    <div>
      <Box
        display={"flex"}
        w={"100"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
      >
        <Box w={"md"}>
          <Box textAlign={"center"}>
            <Text fontWeight={"bold"} fontSize={"3xl"}>
              Sign up
            </Text>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex pt={4} flexDir={"column"} w={"full"} gap={4} px={"12"}>
              <HStack>
                <Controller
                  name="Firstname"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <FormControl
                        id="firstname"
                        isInvalid={!!error}
                        isRequired
                      >
                        <FormLabel>Firstname</FormLabel>
                        <Input
                          type="text"
                          name="Firtname"
                          id={`Firstname_${ID}`}
                          value={value}
                          onChange={onChange}
                        />
                        {error && (
                          <FormErrorMessage>{error.message}</FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}
                />

                <Controller
                  name="Lastname"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <FormControl id="lastname" isInvalid={!!error} isRequired>
                        <FormLabel>Lastname</FormLabel>
                        <Input
                          type="text"
                          name="Lastname"
                          id={`Lastname_${ID}`}
                          value={value}
                          onChange={onChange}
                        />
                        {error && (
                          <FormErrorMessage>{error.message}</FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}
                />
              </HStack>
              <Controller
                name="Email"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <FormControl id="email" isInvalid={!!error} isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="text"
                        name="Email"
                        id={`Email_${ID}`}
                        value={value}
                        onChange={onChange}
                      />
                      {error && (
                        <FormErrorMessage>{error.message}</FormErrorMessage>
                      )}
                    </FormControl>
                  </>
                )}
              />

              <Flex flexDirection={"column"} gap={1}>
                <Controller
                  name="Password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <FormControl id="Password" isInvalid={!!error} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="text"
                          name="Password"
                          id={`Password_${ID}`}
                          value={value}
                          onChange={onChange}
                        />
                        {error && (
                          <FormErrorMessage>{error.message}</FormErrorMessage>
                        )}
                      </FormControl>
                    </>
                  )}
                />

                <Box alignSelf={"flex-end"} display={"flex"} gap={1}>
                  <Text>already have an account? </Text>
                  <Link
                    href="/signup"
                    as={nextLink}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Text sx={{ color: "blue.400" }}>Sign in</Text>
                  </Link>
                </Box>
              </Flex>
              <Button type="submit" colorScheme="twitter">
                Sign up
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </div>
  );
}
