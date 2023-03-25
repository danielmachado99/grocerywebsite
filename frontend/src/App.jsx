import logo from "./logo.svg";
import "./App.css";
import Map from "./Components/Map";
import { Routes, Route } from "react-router-dom";
import ItemBox from "./Components/ItemBox";
import { Box, Button, Center, Input, SimpleGrid, Flex } from "@chakra-ui/react";
import GetItems from "./Components/GetItems";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Components/Sidebar";
import Search from "./Components/Search";
import { InfoIcon, SearchIcon } from "@chakra-ui/icons";
//import "./styles.css";
//import styled, { css } from "styled-components";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import CheckoutSuccess from "./Components/CheckoutSuccess";
function App() {
  // const Button = styled.button`
  //   background: transparent;
  //   border-radius: 3px;
  //   border: 2px solid palevioletred;
  //   color: palevioletred;
  //   margin: 0.5em 1em;
  //   padding: 0.25em 1em;

  //   ${(props) =>
  //     props.primary &&
  //     css`
  //       background: palevioletred;
  //       color: white;
  //       &:hover {
  //         background: ${(props) => props.secondary || "white"};
  //       }
  //     `}

  //   ${(props) => props.secondary && css``}
  // `;

  // const Container = styled.div`
  //   text-align: center;
  // `;
  // var black = "";

  const [Inventory, setInventory] = useState({});

  const [CartState, setCartState] = useState({});
  function setCart(product, increment) {
    console.log({ ...product });
    console.log(increment);
    console.log(Inventory);
    console.log(CartState);
    var newCartState = CartState;
    if (increment) {
      if (product.barcode in CartState) {
        var quantity = CartState[product.barcode]["quantity"];
        newCartState[product.barcode] = { ...product, quantity: quantity + 1 };
      } else {
        newCartState[product.barcode] = { ...product, quantity: 1 };
      }
    } else {
      if (product.barcode in CartState) {
        var quantity = CartState[product.barcode]["quantity"];
        if (quantity > 0) {
          newCartState[product.barcode] = {
            ...product,
            quantity: quantity - 1,
          };
        }
      }
    }
    if (CartState[product.barcode]["quantity"] === 0) {
      delete newCartState[product.barcode];
    }
    console.log(newCartState);
    setCartState({ ...newCartState });
    // const filterted = Inventory.barcodes.filter((element) => {
    //   if (element.barcode === barcode) {
    //     return "element";
    //   }
    // });
    // console.log(filterted);
    //const newCartState = CartState;
    // if (barcode in newCartState === false) {
    //   newCartState[barcode] = 0;
    // }
    // if (increment) {
    //   newCartState[barcode] = newCartState[barcode] + 1;
    // } else {
    //   if (newCartState[barcode] === 0) {
    //   } else {
    //     newCartState[barcode] = newCartState[barcode] - 1;
    //   }
    // }

    // setCartState({ ...newCartState });
    // console.log(CartState);
  }

  function getInventory() {
    let config = {
      method: "get",
      url:
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/getInventory",
      headers: {},
    };
    console.log(
      window.location.protocol +
        "//" +
        window.location.hostname +
        "/getInventory"
    );
    axios(config).then((response) => {
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
      setInventory(InventoryObject);
      // response.data.map((Element) => {
      //   setInventory(response.data);
      // });
    });
  }

  useEffect(() => {
    console.log("getinventory");
    getInventory();
  }, []);

  const [IsSearchActive, setIsSearchActive] = useState(false);
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <Flex justifyContent={"space-between"} p={1}>
        <Sidebar />
        {/* <Button colorScheme="teal" onClick={() => {}}>
          <InfoIcon />
          
        </Button> */}

        <Cart Inventory={Inventory} CartState={CartState} />
        {/* <Button
          colorScheme="teal"
          onClick={() => {
            setIsSearchActive(!IsSearchActive);
          }}
        >
          <SearchIcon />
        </Button> */}
      </Flex>
      <Search Inventory={Inventory} CartState={CartState} setCart={setCart} />

      <Box
        overflow="auto"
        display={IsSearchActive ? "auto" : "none"}
        style={{
          position: "absolute",
          backgroundColor: "white",
          width: "90vw",
          height: "90vh",
          zIndex: "5",
          left: "5vw",
          top: "5vh",
          border: "1px",
          borderColor: "black",
          borderStyle: "solid",
        }}
      >
        <div>
          <Center>
            <Input margin="20px" placeholder="Basic usage" />
          </Center>
          <SimpleGrid margin="20px" minChildWidth="200px" spacing="10px">
            {/* <GetItems Inventory={Inventory} /> */}
          </SimpleGrid>
        </div>
      </Box>
      <div style={{ width: "100%" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SimpleGrid minChildWidth="202px" spacing="10px">
                  <GetItems
                    Inventory={Inventory}
                    setCart={setCart}
                    CartState={CartState}
                  />
                </SimpleGrid>
              </>
            }
          />
          <Route
            path="/checkout"
            element={<Checkout CartState={CartState} />}
          />
          <Route
            path="/checkout/success"
            element={<CheckoutSuccess CartState={CartState} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
