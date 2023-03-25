import React from "react";
import CartItems from "./CartItems";
export default function CheckoutSuccess({ CartState }) {
  return (
    <>
      <p>Order successful:</p>
      <p>_________________</p>
      <CartItems CartState={CartState} />
    </>
  );
}
