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
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { ICustomers, IForm } from "../../interface";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editUser, onSubmit } from "../../redux/customers";
import { useEffect } from "react";

export default function EditCustomers({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const customers: ICustomers[] = useAppSelector(
    ({ customers }) => customers.customers
  );

  const [initialValues, setInitialValues] = useState<IForm>({
    firstname: customers.filter((data: ICustomers) => data.id == id)[0]
      .firstname,
    lastname: customers.filter((data: ICustomers) => data.id == id)[0].lastname,
    company: customers.filter((data: ICustomers) => data.id == id)[0].company,
    email: customers.filter((data: ICustomers) => data.id == id)[0].email,
    password: customers.filter((data: ICustomers) => data.id == id)[0].password,
    admin: false,
  });

  useEffect(() => {
    const userData = customers.filter((data: ICustomers) => data.id == id);
    const { firstname, lastname, company, email, admin }: IForm = userData[0];

    initialValues.firstname = firstname;
    initialValues.lastname = lastname;
    initialValues.company = company;
    initialValues.email = email;
    initialValues.admin = admin;
  }, [id]);

  function getData(values: IForm, resetForm: Function) {
    dispatch(
      editUser({
        id: `${id}`,
        name: `${values.firstname} ${values.lastname}`,
        ...values,
      })
    );
    dispatch(onSubmit(false));
    toast({
      title: `Muvafaqiyatli o\'zgartirildi`,
      status: "success",
      position: "top-right",
      isClosable: true,
    });
    resetForm();
  }

  return (
    <Box py="5">
      <Text fontSize={"x-large"} fontWeight={"bold"} mb="10">
        Edit Customer
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
