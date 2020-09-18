import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contextProdivers/ProductContextProvider";
import ProductsToBeSearched from "./ProductToBeSearched";

export default function ListToBeGenerated() {
  const { productsToBeSearched } = useContext(ProductContext);

  useEffect(() => {
    console.log(productsToBeSearched);
  }, [productsToBeSearched]);

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
