import { Box, Flex, Text } from "@chakra-ui/react";
import { baseColor } from "../../../styles/style";

export const CardPurchase = ({ product, onlyDisplay, ...props }) => {
  return (
    <Box
      bg={baseColor}
      margin={"1rem"}
      paddingBottom={0}
      width={"300px"}
      borderRadius={".5rem"}
    >
      <Box padding={"1rem"}>
        <Text fontSize="xl" fontWeight="bold">
          Compra {product.id}
        </Text>
        <Text>ID do produto: {product.title}</Text>
        <Flex>
          <Flex width="50%">CPF do cliente: {product.cpfCliente}</Flex>
          <Flex width="50%" align="end" justifyContent={"flex-end"}>
            {product.endereco}
          </Flex>
        </Flex>
      </Box>
      {props.isAdmin ? (
        <Flex
          justifyContent={"center"}
          bg="red"
          cursor="pointer"
          onClick={() => {
            props.setProduct(product);
            props.setCurrent("editPurchase");
            props.onOpen();
          }}
        >
          Editar compra
        </Flex>
      ) : null}
    </Box>
  );
};
