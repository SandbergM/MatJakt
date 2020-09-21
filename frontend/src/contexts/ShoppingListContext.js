import React, { createContext, useState, useEffect } from "react";

export const ShoppingListContext = createContext();

export default function ShoppingListContextProvider(props) {
  const [productsToBeSearched, setProductsToBeSearched] = useState([]);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const loadFromLocalStorage = async () => {
    let data = await JSON.parse(localStorage.getItem("matjaktStorage"));
    if (data) {
      setProductsToBeSearched(data);
    }
    console.log(productsToBeSearched);
  };
  const saveToLocalStorage = async () => {
    await localStorage.setItem(
      "matjaktStorage",
      JSON.stringify(productsToBeSearched)
    );
  };

  const addProductToShoppingList = (product) => {
    setProductsToBeSearched([...productsToBeSearched, product]);
    saveToLocalStorage();
  };

  const removeProductToShoppingList = (productToRemove) => {
    setProductsToBeSearched(
      productsToBeSearched.filter((product) => product != productToRemove)
    );
    saveToLocalStorage();
  };

  const singleProductSearch = async (product) => {
    console.log(product);
  };

  const values = {
    productsToBeSearched,
    singleProductSearch,
    addProductToShoppingList,
    removeProductToShoppingList,
  };

  return (
    <ShoppingListContext.Provider value={values}>
      {props.children}
    </ShoppingListContext.Provider>
  );
}
