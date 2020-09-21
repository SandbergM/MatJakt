import React, { useState, useContext, useEffect } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import ProductsToBeSearched from "./ProductToBeSearched";

export default function ListToBeGenerated() {
  const { removeProductToShoppingList, productsToBeSearched } = useContext(
    ShoppingListContext
  );

  if (productsToBeSearched.length != 0) {
    const list = () => {
      return productsToBeSearched.map((product) => {
        return <ProductsToBeSearched product={product} />;
      });
    };
    return (
      <div className="col-12 mb-4 mt-4">
        <div id="product-to-be-searched-list">{list()}</div>
      </div>
    );
  }
  return <></>;
}
