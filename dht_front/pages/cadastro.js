import { Formik, Field } from "formik";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Center,
  Box,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import { baseColor } from "../styles/style";

export default function Cadastro() {
  return (
    <Flex h="100vh" justifyContent="center" bg={baseColor}>
      <Head>
        <title>Cadastro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Formik
          initialValues={{
            name: "",
            cpf: "",
            birthDate: "",
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const rawResponse = await fetch(
              "http://localhost:3001/insertClient",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }
            );
            const content = await rawResponse.json();
            if (content["result"] != "SUCCESS") {
              alert("Algo deu errado, cliente não castrado");
            }
            window.location = "http://localhost:3000/";
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box bg={"white"} padding="7rem 5rem" borderRadius={"1.5rem"}>
                <Heading align="center" mb="2rem">
                  DHT Store
                </Heading>
                <VStack spacing={"2rem"} align="flex-start" width={"400px"}>
                  <FormControl>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      variant="filled"
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                    <Field
                      as={Input}
                      id="cpf"
                      name="cpf"
                      variant="filled"
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      variant="filled"
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="birthDate">
                      Data de nascimento
                    </FormLabel>
                    <Field
                      as={Input}
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      variant="filled"
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      required
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="gray" width="full">
                    Cadastrar
                  </Button>
                </VStack>
              </Box>
            </form>
          )}
        </Formik>
      </Center>
    </Flex>
  );
}
