import React from "react";
//import { Button } from "reactstrap";

// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";
import ProductSearchBar from "./components/ProductSearchBar";
import ChosenProductsList from "./components/ChosenProductsList.js";

// CONTEXTPROVIDERS
import ShoppingListContextProvider from "./contexts/ShoppingListContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import AutoCompleteContextProvider from "./contexts/AutoCompleteContext";

// CSS/SASS
import "./sass/styles.scss";

function App() {
  return (
    <div className="App">
      <ShoppingListContextProvider>
        <AutoCompleteContextProvider>
          <CategoryContextProvider>
            <Header />
            <main className="container">
              <div className="row">
                <ProductSearchBar />
                <ChosenProductsList />
                <List />
              </div>
            </main>
            <Footer />
          </CategoryContextProvider>
        </AutoCompleteContextProvider>
      </ShoppingListContextProvider>
    </div>
  );
}

export default App;
