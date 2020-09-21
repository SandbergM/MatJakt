import React, { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();
export default function CategoryContextProvider(props) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    let data = await fetch(`http://127.0.0.1:3001/categories`);
    data = await data.json();
    setCategories(data);
    console.log('fetched');
  };

  useEffect(() => {
    fetchCategories();
  }, [])

  const values = {
    categories,
  };

  return (
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  );
}
