import React, { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();
export default function CategoryContextProvider(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (productSearched) => {
    let data = await fetch(`http://127.0.0.1:3001/categories`);
    data = await data.json();
    setCategories(data);
  };

  const values = {
    categories,
  };

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
}
