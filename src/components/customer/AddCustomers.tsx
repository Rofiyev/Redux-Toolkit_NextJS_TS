import {
  Text,
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IForm } from "../../interface";
import { useAppDispatch } from "../../redux/hooks";
import { addUser } from "../../redux/customers";

export default function AddCustomers(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [initialValues, setInitialValues] = useState<IForm>({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    password: "",
    admin: false,
  });

  const handleClick = () => setShow(!show);

  function getData(values: IForm, resetForm: Function) {
    console.log(values);
    dispatch(
      addUser({
        id: `${new Date().toLocaleString()}`,
        name: `${values.firstname} ${values.lastname}`,
        ...values,
      })
    );
    toast({
      title: `Muvafaqiyatli qo\'shildi`,
      status: "success",
      position: "top-right",
      isClosable: true,
    });
    resetForm();
  }

  return (
    <Box py="5">
      <Text fontSize={"x-large"} fontWeight={"bold"} mb="10">
        Add Customer
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => getData(values, resetForm)}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack direction={"row"}>
              <FormControl isInvalid={!!errors.firstname && touched.firstname}>
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Field
                  as={Input}
                  id={"firstname"}
                  name={"firstname"}
                  type={"text"}
                  validate={(value: string) => {
                    let error;
                    if (!value) error = "Required";
                    return error;
                  }}
                />
                <FormErrorMessage>{errors.firstname}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastname && touched.lastname}>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Field
                  as={Input}
                  id={"lastname"}
                  name={"lastname"}
                  type={"text"}
                  validate={(value: string) => {
                    let error;
                    if (!value) error = "Required";
                    return error;
                  }}
                />
                <FormErrorMessage>{errors.lastname}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack mt={"4"}>
              <FormControl isInvalid={!!errors.company && touched.company}>
                <FormLabel htmlFor="company">Company</FormLabel>
                <Field
                  as={Input}
                  id={"company"}
                  name={"company"}
                  type={"text"}
                  validate={(value: string) => {
                    let error;
                    if (!value) error = "Required";
                    return error;
                  }}
                />
                <FormErrorMessage>{errors.company}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Text mt="8">Status</Text>
            <Tabs variant="unstyled" mt={"2"}>
              <TabList
                bg={"#E2E8F0"}
                p={"1"}
                borderRadius={"6px"}
                height={"40px"}
              >
                <Tab
                  _selected={{ color: "black", bg: "white" }}
                  borderRadius={"6px"}
                  width={"50%"}
                >
                  User
                </Tab>
                <Tab
                  _selected={{ color: "black", bg: "white" }}
                  borderRadius={"6px"}
                  width={"50%"}
                >
                  Admin
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={"0"}>
                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                      as={Input}
                      id={"email"}
                      name={"email"}
                      type={"email"}
                      validate={(value: string) => {
                        let error;
                        if (!value) error = "Invalid Email";
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt="16px"
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Field
                        as={Input}
                        id={"password"}
                        name={"password"}
                        type={show ? "text" : "password"}
                        validate={(value: string) => {
                          let error;
                          if (value.length <= 8) error = "8+ characters";
                          return error;
                        }}
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          height={"1.75rem"}
                          width={"1rem"}
                          borderRadius={"full"}
                          onClick={handleClick}
                          bg={"transparent"}
                          aria-label="Search database"
                          _hover={{ background: "transparent" }}
                          icon={
                            show ? (
                              <AiFillEyeInvisible fontSize={"18px"} />
                            ) : (
                              <AiFillEye fontSize={"18px"} />
                            )
                          }
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    width="full"
                    mt={"4"}
                    type="submit"
                  >
                    Save
                  </Button>
                </TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
