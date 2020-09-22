import React from "react";

// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductsToBeSearchedList from "./components/ProductsToBeSearchedList";

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
        <CategoryContextProvider>
          <AutoCompleteContextProvider>
            <Header />
            <main className="container">
              <div className="row">
                <ProductSearchBar />
                <ProductsToBeSearchedList />
                <List />
              </div>
            </main>
            <Footer />
          </AutoCompleteContextProvider>
        </CategoryContextProvider>
      </ShoppingListContextProvider>
    </div>
  );
}

export default App;
