import React from "react";
import { Flex, Avatar, Box, Badge, Text } from "@chakra-ui/react";
export default function CartItems({ CartState }) {
  return (
    <>
      {Object.keys(CartState).map((key) => {
        console.log(CartState[key]);

        return (
          <Flex>
            <div>
              {CartState[key] === 0 ? (
                <></>
              ) : (
                <>
                  {" "}
                  <Flex p={4}>
                    <Avatar src={CartState[key].imgurl} />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {CartState[key].name} {CartState[key].size}{" "}
                        {/* <Badge ml="1" colorScheme="green">
                        New
                      </Badge> */}
                      </Text>
                      <Text fontSize="sm">
                        Quantity: {CartState[key].quantity}
                      </Text>
                    </Box>
                  </Flex>
                </>
              )}
            </div>
          </Flex>
        );
      })}
    </>
  );
}
