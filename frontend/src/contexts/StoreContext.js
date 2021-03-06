import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export default function StoreContextProvider(props) {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    let data = await fetch(`http://localhost:3000/stores`);
    data = await data.json();
    setStores(data);
  };

    useEffect(() => {
      fetchStores();
    }, []); 


  const values = {
    stores
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
}
