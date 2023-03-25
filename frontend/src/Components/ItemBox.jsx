import React, { useState, useEffect } from "react";

import { Box, Badge, Image, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ItemBoxTabs from "./ItemBoxTabs";
export default function ItemBox({ Inventory, setCart, CartState }) {
  console.log(Inventory);
  const [ImageUrl, setImageUrl] = useState("");
  const [mrp, setmrp] = useState();
  useEffect(() => {
    console.log("Inventory", Inventory);
    console.log(Inventory[0].imgurl);
    setImageUrl(Inventory[0].imgurl);
    setmrp(Inventory[0].mrp);
  }, []);

  function setImage(e, value) {
    console.log(value);
    //console.log(e.target.attributes.imgurl.value);
    //setImageUrl(e.target.attributes.imgurl.value);
    console.log(JSON.parse(e.target.value).imgurl);
    setImageUrl(JSON.parse(e.target.value).imgurl);
    setmrp(JSON.parse(e.target.value).mrp);
  }
  const property = {
    imageUrl: ImageUrl,
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: Inventory[0].name,
    formattedPrice: mrp,

    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box
      maxHeight="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="none"
      style={{ width: "100%" }}
      alignContent="left"
      boxShadow="base"
      p="6"
      rounded="md"
    >
      <Flex direction="column" height="100%">
        <div
          style={{
            maxHeight: "70%",
            maxWidth: "100%",
            margin: "auto",
          }}
        >
          <img
            src={property.imageUrl}
            alt={property.imageAlt}
            style={{
              height: "100%",
              maxWidth: "100%",
              display: "block",
              margin: "auto",
            }}
          />
        </div>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {/* <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge> */}
            {/* <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box> */}
          </Box>
          <Flex justify="space-between" direction={"column"}>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
              alignSelf="center"
            >
              {property.title}
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
              alignSelf="center"
            >
              MRP: {property.formattedPrice}
            </Box>
          </Flex>

          <ItemBoxTabs
            barcodeVariants={Inventory}
            setImage={setImage}
            setCart={setCart}
            CartState={CartState}
          />
          <Box>
            <Box as="span" color="gray.600" fontSize="sm"></Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
