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
  console.log(product);
  return (
    <>
      <Formik
        initialValues={{
          title: product.title,
          description: product.description,
          qtnd: product.qtnd,
          price: product.price,
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
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
                <FormLabel htmlFor="qtnd">Quantidade</FormLabel>
                <NumberInput
                  value={values.qtnd}
                  onChange={(val) => setFieldValue("qtnd", val)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="qtnd">Preço</FormLabel>
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

              <Button type="submit" colorScheme="red" width="full">
                Apagar produto
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </>
  );
};
