import React, { createContext, useState } from "react";

export const AutoCompleteContext = createContext();
export default function AutoCompleteProvider(props) {
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);

  const fetchAutoCompleteSuggestions = async (productSearched) => {
    let data = await fetch(
      `http://127.0.0.1:3001/autoCompleteSuggestion/${productSearched}`
    );
    data = await data.json();
    setAutoCompleteSuggestions(data);
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
