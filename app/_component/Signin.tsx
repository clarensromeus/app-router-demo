"use client";

import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  Button,
  Divider,
  AbsoluteCenter,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import nextLink from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import SignInValidation from "../_lib/signIn";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const ID = React.useId();
  type formData = z.infer<typeof SignInValidation>;

  const router = useRouter();

  const { handleSubmit, control } = useForm<formData>({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: zodResolver(SignInValidation),
  });

  const onSubmit = async (data: formData) => {
    try {
      const res = await signIn("credentials", {
        Email: data.Email,
        Password: data.Password,
        redirect: false,
      });
      if (res?.error) {
        throw new Error("incorrect credentials");
      }

      router.replace("/dashboard");
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
              Sign in
            </Text>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDir={"column"} w={"full"} gap={4} px={"14"}>
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
                      <FormControl id="password" isInvalid={!!error} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
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
                  <Text>No account? </Text>
                  <Link
                    href="/signup"
                    as={nextLink}
                    _hover={{ textDecoration: "none" }}
                  >
                    <Text sx={{ color: "blue.400" }}>Sign up</Text>
                  </Link>
                </Box>
              </Flex>
              <Button type="submit" colorScheme="twitter">
                Sign In
              </Button>
            </Flex>
          </form>
          <Box pt={3} px={"14"}>
            <Box position="relative" padding="2">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                oR
              </AbsoluteCenter>
            </Box>
          </Box>
          <Box pt={2} px={"14"}>
            <HStack w={"full"}>
              <Button
                w={"full"}
                colorScheme="facebook"
                leftIcon={<FaFacebook />}
              >
                Facebook
              </Button>
              <Button
                w={"full"}
                colorScheme="messenger"
                leftIcon={<FaGoogle />}
              >
                Google
              </Button>
            </HStack>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
