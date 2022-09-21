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
import { CreatePurchaseDrawer } from "../Purchase/CreatePurchaseDrawer";
import { EditPurchaseDrawer } from "../Purchase/EditPurchaseDrawer";

export const AppBar = ({
  children,
  current,
  isOpen,
  onClose,
  onOpen,
  isAdmin,
  ...props
}) => {
  const listMenu = () => (
    <List>
      {isAdmin ? (
        <ListItem>
          <Link onClick={() => props.setCurrent("create")}>
            Adicionar produto
          </Link>
        </ListItem>
      ) : null}
      <ListItem>
        <Link
          onClick={() => {
            props.setList("listProducts");
            onClose();
          }}
        >
          Listar produtos
        </Link>
      </ListItem>
      <ListItem>
        <Link
          onClick={() => {
            props.setList("listPurchases");
            onClose();
          }}
        >
          Listar compras
        </Link>
      </ListItem>
    </List>
  );

  const drawer = {
    createPurchase: <CreatePurchaseDrawer product={props.product} {...props} />,
    editPurchase: (
      <EditPurchaseDrawer
        product={props.product}
        isAdmin={isAdmin}
        {...props}
      />
    ),
    create: <CreateProductDrawer {...props} />,
    edit: <EditProductDrawer {...props} />,
  };

  return (
    <Box d="flex" justifyContent="center">
      <Flex bg={baseColor} height="4rem" alignItems="center">
        <Button id="button-menu" colorScheme="yellow" onClick={onOpen}>
          Menu
        </Button>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={() => {
          props.setCurrent("menu");
          onClose();
        }}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bgColor={baseColor}>
          <DrawerCloseButton />
          <DrawerHeader>DHT</DrawerHeader>

          <DrawerBody>
            {drawer[current] ? drawer[current] : listMenu()}
          </DrawerBody>
          <DrawerFooter>
            <Link id="logout" href="/">Deslogar</Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {children}
    </Box>
  );
};
