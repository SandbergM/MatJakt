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
      console.log();
    }
  };

  const addProductToShoppingList = async (product) => {
    setProductsToBeSearched([...productsToBeSearched, product]);
  };

  const removeProductToShoppingList = async (productToRemove) => {
    setProductsToBeSearched(productsToBeSearched.filter((product) => product !== productToRemove))
  };

  const singleProductSearch = async (product) => {
    console.log(product);
  };

  const fetchGeneratedShoppingLists = async () => {
    let data = await fetch(`http://127.0.0.1:3000/products/generateList`, {
      method: "POST",
      body: JSON.stringify(productsToBeSearched),
      mode: "cors",
      headers: { "Content-type": "application/json;charset=utf-8" }
    })
    data = await data.json();
    setGeneratedShoppingList(data)
    console.log(data);
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
