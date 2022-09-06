import { Box, Flex, Text } from "@chakra-ui/react";
import { baseColor } from "../../../styles/style";

export const CardProduct = ({ product, ...props }) => {
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
          {product.title}
        </Text>
        <Text>{product.description}</Text>
        <Flex>
          <Flex width="50%">{product.qty}</Flex>
          <Flex width="50%" align="end" justifyContent={"flex-end"}>
            R$ {product.price}
          </Flex>
        </Flex>
      </Box>
      <Flex justifyContent={"center"} cursor="pointer">
        Adicionar ao carrinho
      </Flex>
      {props.isAdmin ? (
        <Flex
          justifyContent={"center"}
          bg="red"
          cursor="pointer"
          onClick={() => {
            props.setProduct(product);
            props.setCurrent("edit");
            props.onOpen();
          }}
        >
          Editar produto
        </Flex>
      ) : null}
    </Box>
  );
};
