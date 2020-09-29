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
    let data = localStorage.getItem("matjaktLocalSave");
    if (data) {
      data = await JSON.parse(data);
      setProductsToBeSearched(data);
    }
  };

  const addProductToShoppingList = async (product) => {
    setProductsToBeSearched((productsToBeSearched) => [
      ...productsToBeSearched,
      product,
    ]);
  };

  const removeProductToShoppingList = async (productToRemove) => {
    setProductsToBeSearched(
      productsToBeSearched.filter((product) => product !== productToRemove)
    );
  };

  const singleProductSearch = async (product) => {
    console.log(product);
  };

  const fetchGeneratedShoppingLists = async () => {
    fetch(`http://127.0.0.1:3000/products/generateList`, {
      method: "POST",
      body: JSON.stringify(productsToBeSearched),
      mode: "cors",
      headers: { "Content-type": "application/json;charset=utf-8" },
    }).then(async (data) => {
      setGeneratedShoppingList(await data.json());
    });
  };

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
