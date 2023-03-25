import React, { useState, useEffect } from "react";
import {
  Box,
  Badge,
  Image,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Select,
  Button,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
export default function ItemBoxTabs({
  barcodeVariants,
  setImage,
  setCart,
  CartState,
}) {
  console.log(barcodeVariants);
  const [CurrentVariant, setCurrentVariant] = useState(barcodeVariants[0]);

  useEffect(() => {
    console.log("currentvariant", CurrentVariant);
  }, [CurrentVariant]);

  function incrementBarcode() {
    console.log(CurrentVariant);
    setCart(CurrentVariant, true);
    //const newCart=[Cart.filter(Element=>{})]
  }
  function decrementBarcode() {
    console.log(CurrentVariant);
    setCart(CurrentVariant, false);
  }

  return (
    <div>
      {/* <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {barcodeVariants.map((Element) => {
            console.log(Element.barcode);
            return (
              <Tab
                onClick={(e) => {
                  setImage(e);
                }}
                id={Element.barcode}
                key={Element.barcode}
                imgurl={Element.imgurl}
              >
                {Element.quantity}
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs> */}
      <div style={{ display: "flex", height: "40px" }}>
        <Select
          id="optionSelected"
          size="md"
          onChange={(e) => {
            // console.log(e);
            console.log(
              "JSON.parse(e.target.value)",
              JSON.parse(e.target.value)
            );
            setCurrentVariant(JSON.parse(e.target.value));
            setImage(e);
          }}
        >
          {barcodeVariants.map((Element) => {
            console.log(Element.barcode);
            return (
              <option
                //   onClick={(e) => {
                //     setImage(e);
                //   }}
                //   onChange={(e) => {
                //     setImage(e);
                //   }}
                value={JSON.stringify(Element)}
                id={Element.barcode}
                key={Element.barcode}
                imgurl={Element.imgurl}
              >
                {Element.size}
              </option>
            );
          })}
        </Select>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            backgroundColor="green"
            textAlign="center"
            onClick={incrementBarcode}
          >
            <Center height="auto">+</Center>
          </Button>
          <Button
            backgroundColor="firebrick"
            height="auto"
            onClick={decrementBarcode}
          >
            -
          </Button>
        </div>
      </div>
      <div>
        {console.log(
          "CartState",
          CartState,
          CurrentVariant.barcode,
          Object.keys(CartState).length !== 0 &&
            CurrentVariant.barcode in CartState
        )}
        {CurrentVariant.barcode in CartState ? (
          <>
            {/* <p key={CurrentVariant.barcode}>
            {CartState[CurrentVariant.barcode]["quantity"]}
          </p> */}

            <Box ml="3">
              <Text fontSize="md">
                Quantity: {CartState[CurrentVariant.barcode]["quantity"]}
              </Text>
            </Box>
          </>
        ) : (
          <>
            {/* <p key={CurrentVariant.barcode}>
            {CartState[CurrentVariant.barcode]["quantity"]}
          </p> */}

            <Box ml="3" p={2}></Box>
          </>
        )}
      </div>
    </div>
  );
}
