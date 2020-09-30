import React, { useContext, useState } from "react";
import Store from './Store';
import { ShoppingListContext } from '../contexts/ShoppingListContext';

export default function List() {
  const { generatedShoppingList } = useContext(ShoppingListContext)

  let stores = [
    { name: "Ica", color: "#E83F39" },
    { name: "Coop", color: "#66C46C" },
    { name: "Willy's", color: "#743EBB" },
  ];

  let singleProductSearchResults = []

  //stores[] will be replaced with an array, [{Store: Ica, generatedShoppingList[], singleProductSearchResult[] }] ?

  return (
    <div className="col-12 d-flex">
      {stores.map(store => {
        return (<Store store={store} singleProductSearchResults={singleProductSearchResults} generatedShoppingList={generatedShoppingList} />)
      })}
    </div>
  )
}