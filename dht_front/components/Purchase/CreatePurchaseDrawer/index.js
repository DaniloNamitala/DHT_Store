import { Formik, Field } from "formik";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { CardPurchase } from "../../Purchase/CardPurchase";
import { useRouter } from "next/router";
import headers from "../../../utils/headers";

export const CreatePurchaseDrawer = ({ setCurrent, product }) => {
  const router = useRouter();
  const { user } = router.query;
  return (
    <>
      <Formik
        initialValues={{
          price: product.price,
          endereco: "",
          CEP: "",
          cidade: "",
          cpf: user,
        }}
        onSubmit={async (values) => {
          console.log("submit");
          const rawResponse = await fetch(
            "http://localhost:3001/cadastrarCompra",
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                idProduto: product.id,
                cpfCliente: values.cpf,
                quantidade: 1,
                endereco: values.endereco,
                cep: values.CEP,
                cidade: values.city,
              }),
            }
          );
          const content = await rawResponse.json();
          if (content["result"] != "SUCCESS") {
            alert("Algo deu errado, produto não adicionado");
          }
          window.location.reload();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <CardPurchase
                isAdmin={false}
                onlyDisplay={true}
                key={product.id}
                id={product.id}
                product={{
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  qty: product.qtdy,
                  cpf: user,
                }}
              />
              <FormControl>
                <FormLabel htmlFor="endereco">Endereço</FormLabel>
                <Field
                  as={Input}
                  id="endereco"
                  name="endereco"
                  variant="filled"
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="CEP">CEP</FormLabel>
                <Field as={Input} id="CEP" name="CEP" variant="filled" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="city">Cidade</FormLabel>
                <Field as={Input} id="city" name="city" variant="filled" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">Pagamento</FormLabel>
                <NumberInput
                  disabled
                  value={values.price}
                  onChange={(val) => setFieldValue("price", val)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cpf">CPF do cliente</FormLabel>
                <Field
                  as={Input}
                  disabled
                  id="cpf"
                  name="cpf"
                  variant="filled"
                />
              </FormControl>

              <Button type="submit" colorScheme="gray" width="full">
                Cadastrar
              </Button>
              <Button
                type="button"
                onClick={() => setCurrent("list")}
                colorScheme="red"
                width="full"
              >
                Cancelar
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );
};
