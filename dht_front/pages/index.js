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
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import { baseColor } from "../styles/style";

export default function Login() {
  return (
    <Flex h="100vh" justifyContent="center" bg={baseColor}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const rawResponse = await fetch("http://localhost:3001/login", {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            const content = await rawResponse.json();
            console.log(content.result);
            if (content["result"] == "FAILED") {
              alert("Algo deu errado, credenciais erradas");
            } else {
              window.location = `http://localhost:3000/home?user=${content.user.cpf}&admin=${content.user.admin}`;
            }
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
                    Logar
                  </Button>
                </VStack>
                <Center mt="2rem">
                  <Link href="/cadastro" id="cadastro">Cadastre-se</Link>
                </Center>
              </Box>
            </form>
          )}
        </Formik>
      </Center>
    </Flex>
  );
}
