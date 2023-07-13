import Head from "next/head";
import {
  Text,
  Flex,
  Divider,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
} from "@chakra-ui/react";
import Layout from "../layout/Layout";
import { AddCustomers, EditCustomers } from "../components";
import Image from "next/image";
import image_1 from "../assets/1.png";
import image_2 from "../assets/2.png";
import image_3 from "../assets/3.png";
import image_4 from "../assets/4.png";
import image_5 from "../assets/5.png";
import image_6 from "../assets/6.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ICustomers } from "../interface";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { onSubmit, removeUser } from "../redux/customers";
import { useState } from "react";

const randomImage: any = [image_1, image_2, image_3, image_4, image_5, image_6];

export default function Home(): JSX.Element {
  const submit: boolean = useAppSelector(({ customers }) => customers.submit);

  const customers: ICustomers[] = useAppSelector(
    ({ customers }) => customers.customers
  );
  const dispatch = useAppDispatch();
  const [ID, setID] = useState<string>("");

  const deleteUser = (id: string) => {
    dispatch(removeUser(id));
    dispatch(onSubmit(false));
  };

  const editUser = (id: string) => {
    dispatch(onSubmit(true));
    setID(id);
  };

  return (
    <>
      <Head>
        <title>@Rof1yev - App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex gap="20px" direction="row">
          <Box width={"27%"}>
            {submit ? <EditCustomers id={ID} /> : <AddCustomers />}
          </Box>
          <Divider orientation="vertical" height={"100vh"} />
          <Box width={"63%"} py={"5"}>
            <Text fontSize={"x-large"} fontWeight={"bold"} mb="10">
              Customers
            </Text>
            <TableContainer minW={"950px"}>
              <Table size="sm" variant="unstyled">
                <Thead>
                  <Tr>
                    <Th fontFamily={"inherit"} textTransform={"capitalize"}>
                      Name
                    </Th>
                    <Th fontFamily={"inherit"} textTransform={"capitalize"}>
                      Company
                    </Th>
                    <Th fontFamily={"inherit"} textTransform={"capitalize"}>
                      Email
                    </Th>
                    <Th fontFamily={"inherit"} textTransform={"capitalize"}>
                      Admin
                    </Th>
                    <Th fontFamily={"inherit"} textTransform={"capitalize"}>
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {customers.map((item: ICustomers) => (
                    <Tr key={item.id}>
                      <Td display={"flex"} alignItems={"center"} gap={"8px"}>
                        <Box bg={"#E2E8F0"} borderRadius={"4px"}>
                          <Image
                            src={
                              randomImage[
                                Math.floor(Math.random() * randomImage.length)
                              ]
                            }
                            width={35}
                            height={35}
                            style={{ objectFit: "cover" }}
                            alt="Brand"
                          />
                        </Box>
                        {item.name}
                      </Td>
                      <Td>{item.company}</Td>
                      <Td>{item.email}</Td>
                      <Td>
                        <Box
                          width={"50px"}
                          height={"20px"}
                          bg={item.admin ? "#0EA5E9" : "#E2E8F0"}
                          borderRadius={"4px"}
                        ></Box>
                      </Td>
                      <Td display={"flex"} gap={"8px"}>
                        <IconButton
                          bg={"transparent"}
                          _hover={{ background: "transparent" }}
                          aria-label="Edit Icon button"
                          onClick={() => editUser(item.id)}
                          icon={
                            <BiEditAlt color={"#aaaaaa"} fontSize={"20px"} />
                          }
                        />
                        <IconButton
                          bg={"transparent"}
                          _hover={{ background: "transparent" }}
                          aria-label="Delete Icon button"
                          onClick={() => deleteUser(item.id)}
                          icon={<BsTrash color={"#aaaaaa"} fontSize={"20px"} />}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </Layout>
    </>
  );
}
