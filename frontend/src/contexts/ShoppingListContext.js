import React, { createContext, useState, useEffect } from "react";

export const ShoppingListContext = createContext();

export default function ShoppingListContextProvider(props) {
  const [productsToBeSearched, setProductsToBeSearched] = useState([]);
  const [generatedShoppingList, setGeneratedShoppingList] = useState([]);

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
    if (data) {
      data = await JSON.parse(data);
      setProductsToBeSearched(data)
    }
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

  const fetchGeneratedShoppingLists = async () => {
    console.log(`Finding stuff`);
  }

  const values = {
    productsToBeSearched,
    singleProductSearch,
    addProductToShoppingList,
    removeProductToShoppingList,
    fetchGeneratedShoppingLists,
    generatedShoppingList,
  };

  return (
    <ShoppingListContext.Provider value={values}>
      {props.children}
    </ShoppingListContext.Provider>
  );
}
