import React, { createContext, useState } from "react";

export const ProductContext = createContext();
export default function ProductContextProvider(props) {
  const [productsToBeSearched, setProductsToBeSearched] = useState([]);

  const addProductToSearchList = (product) => {
    setProductsToBeSearched([...productsToBeSearched, product]);
  };

  const removeProductToSearchFromList = (productToRemove) => {
    setProductsToBeSearched(
      productsToBeSearched.filter((product) => product != productToRemove)
    );
  };

  const values = {
    productsToBeSearched,
    addProductToSearchList,
    removeProductToSearchFromList,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}
