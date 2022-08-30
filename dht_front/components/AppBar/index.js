import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  List,
  ListItem,
} from "@chakra-ui/react";

import { baseColor } from "../../styles/style";
import { CreateProductDrawer } from "../Product/CreateProductDrawer";
import { EditProductDrawer } from "../Product/EditProductDrawer";

export const AppBar = ({
  children,
  current,
  isOpen,
  onClose,
  onOpen,
  ...props
}) => {
  const ListItens = () => (
    <List>
      <ListItem>
        <Link onClick={() => props.setCurrent("create")}>
          Adicionar produto
        </Link>
      </ListItem>
    </List>
  );

  const drawer = {
    create: <CreateProductDrawer {...props} />,
    edit: <EditProductDrawer {...props} />,
    list: ListItens(),
  };

  return (
    <Box d="flex" justifyContent="center">
      <Flex bg={baseColor} height="4rem" alignItems="center">
        <Button colorScheme="yellow" onClick={onOpen}>
          Menu
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor={baseColor}>
          <DrawerCloseButton />
          <DrawerHeader>DHT</DrawerHeader>

          <DrawerBody>{drawer[current]}</DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      {children}
    </Box>
  );
};
