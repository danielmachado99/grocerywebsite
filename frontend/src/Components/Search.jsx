import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

import { InfoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems";
import {
  RadioGroup,
  Stack,
  Radio,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Center,
  Input,
  SimpleGrid,
  Box,
  IconButton,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import GetItems from "./GetItems";
const axios = require("axios");
const qs = require("qs");
export default function Search({ Inventory, CartState, setCart }) {
  const [placement, setPlacement] = React.useState("right");

  let navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const btnRef = React.useRef(null);

  const [scroll, setScroll] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY >= scrollPos) {
        setScroll(true);
      } else {
        setScroll(false);
      }
      setScrollPos(window.scrollY);
    });
  });

  const [SearchInventory, setSearchInventory] = useState({});
  function search(e) {
    if (e.target.value.length <= 1) {
      setSearchInventory({});
      return null;
    }
    console.log(e.target.value);
    let data = qs.stringify({
      name: e.target.value,
    });
    console.log(data);
    let config = {
      method: "post",
      url:
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/searchInventory",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };
    console.log(config);
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data[0]);
        var InventoryObject = {};
        response.data.map((Element) => {
          var item = {
            name: Element.name,
            barcode: Element.barcode,
            size: Element.size,
            imgurl: Element.imgurl,
            mrp: Element.mrp["$numberDecimal"],
          };
          if (InventoryObject[Element.name] === undefined) {
            InventoryObject[Element.name] = [item];
          } else {
            InventoryObject[Element.name].push(item);
          }
          console.log(InventoryObject);
        });
        setSearchInventory(InventoryObject);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return scroll ? (
    <></>
  ) : (
    <div
      style={{
        height: "-webkit-fill-available",
        position: "absolute",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "85%",
          float: "right",
          padding: "30px",
          zIndex: 5,
        }}
      >
        <>
          {/* <RadioGroup value={scrollBehavior} onChange={setScrollBehavior}>
        <Stack direction="row">
          <Radio value="inside">inside</Radio>
          <Radio value="outside">outside</Radio>
        </Stack>
      </RadioGroup> */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <Box>
            <IconButton
              colorScheme="teal"
              ref={btnRef}
              onClick={onOpen}
              borderRadius="full"
              icon={<SearchIcon />}
              boxSize="60px"
              boxShadow="2xl"
            >
              Search
              <i
                class="fa fa-shopping-cart"
                aria-hidden="true"
                style={{ marginLeft: "0.5vw" }}
              ></i>
            </IconButton>
            <Modal
              onClose={onClose}
              finalFocusRef={btnRef}
              isOpen={isOpen}
              scrollBehavior={scrollBehavior}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Search</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Center>
                    <Input
                      marginBottom="1vh"
                      placeholder="Search"
                      onChange={(e) => {
                        search(e);
                      }}
                    />
                  </Center>
                  <SimpleGrid minChildWidth="202px" spacing="10px">
                    <GetItems
                      Inventory={SearchInventory}
                      setCart={setCart}
                      CartState={CartState}
                    />
                  </SimpleGrid>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </>
      </div>
    </div>
  );
}
