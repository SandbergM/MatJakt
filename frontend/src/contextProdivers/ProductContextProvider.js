import React, { createContext, useState } from "react";

export const ProductContext = createContext();
export default function ProductContextProvider(props) {
  const [productsToBeSearched, setProductsToBeSearched] = useState([]);
  const [
    productAutoCompleteSuggestions,
    setProductAutoCompleteSuggestions,
  ] = useState([]);

  const addProductToSearchList = (product) => {
    setProductsToBeSearched([...productsToBeSearched, product]);
  };

  const removeProductToSearchFromList = (productToRemove) => {
    setProductsToBeSearched(
      productsToBeSearched.filter((product) => product != productToRemove)
    );
  };
  const fetchProductAutoCompleteSuggestions = async (productSearched) => {
    let data = await fetch(
      `http://127.0.0.1:3001/autoCompleteSuggestion/${productSearched}`
    );
    data = await data.json();
    setProductAutoCompleteSuggestions(data);
  };

  const values = {
    productsToBeSearched,
    addProductToSearchList,
    removeProductToSearchFromList,
    productAutoCompleteSuggestions,
    fetchProductAutoCompleteSuggestions,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}
