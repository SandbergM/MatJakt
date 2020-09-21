import React, { createContext, useState, useEffect } from "react";

export const ShoppingListContext = createContext();

export default function ShoppingListContextProvider(props) {
  const [productsToBeSearched, setProductsToBeSearched] = useState([]);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "matjaktLocalSave",
      JSON.stringify(productsToBeSearched)
    );
  }, [productsToBeSearched]);

  const loadFromLocalStorage = async () => {
    let data = localStorage.getItem('matjaktLocalSave')
    data = await JSON.parse(data);
    setProductsToBeSearched(data)
  };


  const addProductToShoppingList = async (product) => {
    setProductsToBeSearched([...productsToBeSearched, product]);
  };

  const removeProductToShoppingList = async (productToRemove) => {
    setProductsToBeSearched(productsToBeSearched.filter((product) => product != productToRemove))
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
