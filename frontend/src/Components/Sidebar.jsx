import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Radio,
  RadioGroup,
  Button,
  DrawerOverlay,
  DrawerHeader,
  useDisclosure,
  Stack,
  Drawer,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";
import React from "react";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

  return (
    <div style={{ right: "5000px" }}>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>
        {/* <Stack direction="row" mb="4">
          <Radio value="top">Top</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="bottom">Bottom</Radio>
          <Radio value="left">Left</Radio>
        </Stack> */}
      </RadioGroup>
      <Button colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon></HamburgerIcon>
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            {/* <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
