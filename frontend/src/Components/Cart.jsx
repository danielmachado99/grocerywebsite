import React from "react";
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
} from "@chakra-ui/react";
export default function Cart({ Inventory, CartState }) {
  let navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const btnRef = React.useRef(null);

  function filterbarcodes(element, key) {
    console.log(element);

    for (let i = 0; i < element.barcodes.length; i++) {
      const barcode = element.barcodes[i];
      if (barcode.barcode === key) {
        console.log(element.name);
        return { name: element.name, quantity: barcode.quantity };
      }
    }

    return element.barcodes.filter((barcode) => {
      if (barcode.barcode === key) {
        console.log(element.name);
        return "element";
      }
    });
  }

  return (
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
      <Button colorScheme="teal" ref={btnRef} onClick={onOpen}>
        Cart
        <i
          class="fa fa-shopping-cart"
          aria-hidden="true"
          style={{ marginLeft: "0.5vw" }}
        ></i>
      </Button>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={15} /> */}
            {console.log(Inventory)}
            {/* {Object.keys(CartState).map((key) => {
              var quantity = "";
              const inventoryitem = Inventory.filter((element) => {
                const temp = filterbarcodes(element, key);

                if (typeof temp.name === typeof "s") {
                  console.log(temp);
                  quantity = temp.quantity;
                  return temp;
                }
              });
              console.log(inventoryitem);
              console.log(CartState[key]);
              return (
                <div>
                  {CartState[key] === 0 ? (
                    <></>
                  ) : (
                    <p>
                      {inventoryitem[0].name} {quantity}: {CartState[key]}
                    </p>
                  )}
                </div>
              );
            })} */}

            {<CartItems CartState={CartState} />}
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor="green"
              onClick={(e) => {
                onClose();
                navigate("../checkout", { replace: true });
              }}
            >
              Checkout
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
