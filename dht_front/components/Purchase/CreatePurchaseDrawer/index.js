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
import { CardProduct } from "../../Product/CardProduct";

export const CreatePurchaseDrawer = ({ setCurrent, product }) => {
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
          qty: 0,
          price: 0,
        }}
        onSubmit={async (values) => {
          const rawResponse = await fetch(
            "http://localhost:3001/insertProduct",
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
            alert("Algo deu errado, produto não adicionado");
          }
          window.location.reload();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <CardProduct
                isAdmin={false}
                onlyDisplay={true}
                key={product.id}
                id={product.id}
                product={{
                  id: product.id,
                  title: product.nome,
                  description: product.descricao,
                  price: product.preco,
                  qty: product.quantidade,
                }}
              />
              <FormControl>
                <FormLabel htmlFor="title">Nome</FormLabel>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  variant="filled"
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="qty">Quantidade</FormLabel>
                <NumberInput
                  value={values.qty}
                  onChange={(val) => setFieldValue("qty", val)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="price">Preço</FormLabel>
                <NumberInput
                  value={values.price}
                  onChange={(val) => setFieldValue("price", val)}
                >
                  <NumberInputField />
                </NumberInput>
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
