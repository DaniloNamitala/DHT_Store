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

export const CreateProductDrawer = ({setCurrent}) => {
  return (
    <>
      <Formik
          initialValues={{
            title: "",
            description: "",
            qtnd: 0,
            price:0,
          }}
          onSubmit={(values) => {
            const res = fetch("0.0.0.0:3001/insertProduct", values)
            const data = res.json()
            alert(JSON.stringify(data, null, 2));
          }}
        >
          {({ handleSubmit, values ,setFieldValue }) => (
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
                <FormControl >
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    variant="filled"
                  />
                </FormControl>
                <FormControl >
                  <FormLabel htmlFor="qtnd">Quantidade</FormLabel>
                  <NumberInput value={values.qtnd} onChange={val => setFieldValue('qtnd', val)}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <FormControl >
                  <FormLabel htmlFor="qtnd">Preço</FormLabel>
                  <NumberInput value={values.price} onChange={val => setFieldValue('price', val)}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                
                <Button type="submit" colorScheme="gray" width="full">
                  Cadastrar
                </Button>
                <Button type="button" onClick={()=>setCurrent('list')} colorScheme="red" width="full">
                  Cancelar
                </Button>
              </VStack>
            </form>
          )}
        </Formik>    
    </>
  )
}