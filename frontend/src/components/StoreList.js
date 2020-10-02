import React, { useContext, useState } from "react";
import Store from './Store';
import { ShoppingListContext } from '../contexts/ShoppingListContext';

export default function List() {

  let stores = [
    { name: "Ica", color: "#E83F39", _id: "5f59e688f158c91676980f43" },
    { name: "Coop", color: "#66C46C", _id: "5f59e826f158c91676980f44" },
    { name: "Willy's", color: "#743EBB", _id: "5f59e877f158c91676980f45" },
  ];

  return (
    <div className="col-12 d-flex">
      {stores.map(store => {
        return (<Store store={store} />)
      })}
    </div>
  )
}