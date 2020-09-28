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

  return (
    <div className="col-12 d-flex">
      {stores.map(store => {
        return (<Store store={store} products={generatedShoppingList} />)
      })}
    </div>
  )
}