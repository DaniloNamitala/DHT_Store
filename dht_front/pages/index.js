import { Center, Flex, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { CardProduct } from "../components/Product/CardProduct";
import products from "../products.json";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdmin, setAdmin] = useState(true);
  const [product, setProduct] = useState(null);
  const [current, setCurrent] = useState("list");

  useEffect(() => {
    if (!isOpen) setCurrent("list");
  }, [isOpen]);

  return (
    <>
      <Head>
        <title>DHT Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column">
        <AppBar
          current={current}
          product={product}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          setCurrent={setCurrent}
        ></AppBar>
        <Center>
          <Flex width="70%" mt={"2rem"} flexWrap="wrap">
            {products.data.map((product) => {
              const productObject = {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                qtnd: product.qtnd,
              };
              return (
                <CardProduct
                  isAdmin={isAdmin}
                  key={product.id}
                  id={product.id}
                  product={productObject}
                  setCurrent={setCurrent}
                  setProduct={setProduct}
                  onOpen={onOpen}
                />
              );
            })}
          </Flex>
        </Center>
      </Flex>
    </>
  );
}
