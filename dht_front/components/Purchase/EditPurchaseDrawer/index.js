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

import headers from "../../../utils/headers";
import { useRouter } from "next/router";
import { CardPurchase } from "../CardPurchase";

export const EditPurchaseDrawer = ({ setCurrent, product, isAdmin }) => {
  const router = useRouter();
  const { user } = router.query;

  const deletePurchase = async () => {
    const rawResponse = await fetch("http://localhost:3001/deletarCompra", {
      method: "POST",
      headers,
      body: JSON.stringify({ id: product.id }),
    });
    console.log(rawResponse);
    const content = await rawResponse.json();
    if (content["result"] != "SUCCESS") {
      alert("Algo deu errado, compra não excluida");
    }
    // window.location.reload();
  };

  return (
    <>
      <Formik
        initialValues={{
          price: product.price,
          endereco: product.endereco,
          CEP: product.cep,
          city: product.cidade,
          cpf: user,
        }}
        onSubmit={async (values) => {
          console.log("submit");
          const rawResponse = await fetch(
            "http://localhost:3001/editarCompra",
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                id: product.id,
                idProduto: product.title,
                cpfCliente: values.cpf,
                quantidade: 1,
                endereco: values.endereco,
                cep: values.CEP,
                cidade: values.city,
                preco: values.price,
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
                  title: product.title,
                  id: product.id,
                  endereco: product.endereco,
                  cep: product.cep,
                  price: product.price,
                  cpfCliente: product.cpfCliente,
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
                Editar
              </Button>
              <Button
                type="button"
                onClick={() => setCurrent("list")}
                colorScheme="red"
                width="full"
              >
                Cancelar
              </Button>

              {isAdmin ? (
                <Button
                  type="submit"
                  colorScheme="red"
                  width="full"
                  onClick={deletePurchase}
                >
                  Apagar compra
                </Button>
              ) : null}
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );
};
