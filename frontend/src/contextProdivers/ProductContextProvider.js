import React, { createContext, useState } from "react";

export const ProductContext = createContext();
export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const values = {
    products,
    addProduct,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
}
