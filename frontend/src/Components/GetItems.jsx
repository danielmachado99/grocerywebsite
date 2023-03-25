import React, { useState, useEffect } from "react";
import ItemBox from "./ItemBox";
export default function GetItems({ Inventory, setCart, CartState }) {
  const numbers = [...Array(10).keys()];
  return (
    <>
      {console.log(Inventory)}
      {numbers.map((e) => {})}
      {Object.keys(Inventory).map((NameArray) => {
        // return numbers.map(() => {
        console.log(
          "Inventory[NameArray][0]['barcode']",
          Inventory[NameArray][0]["barcode"]
        );
        return (
          <>
            <ItemBox
              key={Inventory[NameArray][0]["barcode"]}
              Inventory={Inventory[NameArray]}
              setCart={setCart}
              CartState={CartState}
            />
          </>
        );
        // });
      })}
    </>
  );
}
