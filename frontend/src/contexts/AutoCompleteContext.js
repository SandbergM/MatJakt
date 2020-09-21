import React, { createContext, useState } from "react";

export const AutoCompleteContext = createContext();
export default function AutoCompleteProvider(props) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);

  const fetchAutoCompleteSuggestions = async (productSearched) => {
    let data = await fetch(
      `http://127.0.0.1:3001/autoCompleteSuggestion/${productSearched}`
    );
    setAutoCompleteSuggestions(await data.json())
    console.log(autoCompleteSuggestions);
  };

  const values = {
    autoCompleteSuggestions,
    fetchAutoCompleteSuggestions,
  };

  return (
    <AutoCompleteContext.Provider value={values}>
      {props.children}
    </AutoCompleteContext.Provider>
  );
}