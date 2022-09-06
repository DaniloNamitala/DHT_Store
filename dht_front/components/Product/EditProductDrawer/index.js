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

export const EditProductDrawer = ({ product, ...props }) => {
  const deleteProduct = async () => {
    const rawResponse = await fetch("http://localhost:3001/deleteProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: product.id }),
    });
    const content = await rawResponse.json();
    if (content["result"] != "SUCCESS") {
      alert("Algo deu errado, produto não excluido");
    }
    window.location.reload();
  };

  return (
    <>
      <Formik
        initialValues={{
          title: product.title,
          description: product.description,
          qty: product.qty,
          price: product.price,
        }}
        onSubmit={async (values) => {
          const rawResponse = await fetch("http://localhost:3001/editProduct", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: product.id, ...values }),
          });
          const content = await rawResponse.json();
          if (content["result"] != "SUCCESS") {
            alert("Algo deu errado, produto não Editado");
          }
          window.location.reload();
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="title">Titulo</FormLabel>
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
                <FormLabel htmlFor="qty">Preço</FormLabel>
                <NumberInput
                  value={values.price}
                  onChange={(val) => setFieldValue("price", val)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <Button type="submit" colorScheme="gray" width="full">
                Salvar
              </Button>

              <Button
                type="submit"
                colorScheme="red"
                width="full"
                onClick={deleteProduct}
              >
                Apagar produto
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );
};
