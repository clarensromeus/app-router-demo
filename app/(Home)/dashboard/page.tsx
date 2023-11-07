import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import LogOut from "@/app/_component/logout";
import UserIdentity from "@/app/_component/userIdentity";
import { createProduct } from "@/app/_component/_actions/CreateProducts";
import { AllProducts } from "@/app/_component/GetallProducts";
import Delete from "@/app/_component/Delete";

export default async function Dashboard() {
  const data: {
    products: { id: string; ProductName: string; Price: string }[];
  } = await AllProducts();

  return (
    <div>
      <Box p={"4"}>
        <LogOut />
      </Box>
      <Flex
        w={"100"}
        h={"100vh"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Box w={"md"} pt={12}>
          <Box>
            <HStack
              alignSelf={"flex-start"}
              display={"flex"}
              alignItems={"center"}
            >
              <Box>
                <FaUser />
              </Box>
              <UserIdentity />
            </HStack>
            <Box pt={6}>
              <form action={createProduct}>
                <Box>
                  <InputGroup>
                    <Input
                      name="ProductName"
                      variant={"outline"}
                      placeholder="add product..."
                    />
                    <InputRightAddon>
                      <Button type={"submit"} rightIcon={<FaSearch />}></Button>
                    </InputRightAddon>
                  </InputGroup>
                </Box>
              </form>
            </Box>
          </Box>
          <Box w={"full"} pt={5}>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Product name</Th>
                    <Th>Price</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.products.map((products, key) => {
                    return (
                      <Tr key={key}>
                        <Td>{products.id}</Td>
                        <Td>{products.ProductName}</Td>
                        <Td>{products.Price} $</Td>
                        <Td>
                          <HStack spacing={3}>
                            <Delete productId={products.id} />
                            <IconButton
                              size={"sm"}
                              aria-label="edit"
                              icon={<MdEdit color="blue" size={21} />}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Product name</Th>
                    <Th>Price</Th>
                    <Th>Action</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
