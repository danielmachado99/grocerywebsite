import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react";

export default function Checkout({ CartState }) {
  let navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState({});
  const [OrderResponse, setOrderResponse] = useState("");

  function navigateSuccess() {
    navigate("../checkout/success", { replace: true });
    console.log("navigateSuccess");
  }

  return (
    <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
      <FormControl
        isRequired
        onSubmit={(e) => {
          console.log(e);
        }}
      >
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setUserInfo({ ...UserInfo, Name: e.target.value });
          }}
        />
        <FormLabel>Mobile number</FormLabel>
        <Input
          placeholder="Mobile number"
          onChange={(e) => {
            setUserInfo({ ...UserInfo, "Mobile number": e.target.value });
          }}
        />
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          onChange={(e) => {
            setUserInfo({ ...UserInfo, Email: e.target.value });
          }}
        />
        <FormLabel>Address</FormLabel>
        <Textarea
          placeholder="Address"
          onChange={(e) => {
            setUserInfo({ ...UserInfo, Address: e.target.value });
          }}
        />
        <Button
          onClick={(e) => {
            console.log({ ...UserInfo, Cart: CartState });

            const axios = require("axios");
            const qs = require("qs");
            let data = qs.stringify({ ...UserInfo, CartState });
            let config = {
              method: "post",
              url:
                window.location.protocol +
                "//" +
                window.location.hostname +
                "/neworder",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              data: data,
            };

            axios(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                setOrderResponse(JSON.stringify(response.data));
                navigateSuccess();
              })
              .catch((error) => {
                console.log(error);
                setOrderResponse(JSON.stringify(error));
              });
          }}
        >
          Submit
        </Button>
      </FormControl>
      {OrderResponse ? <p>{OrderResponse}</p> : <></>}
    </Box>
  );
}
