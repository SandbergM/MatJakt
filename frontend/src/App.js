import React from "react";

// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header";
import StoreList from "./components/StoreList";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductsToBeSearchedList from "./components/ProductsToBeSearchedList";
import BottomButtons from "./components/BottomButtons";

// CONTEXTPROVIDERS
import ShoppingListContextProvider from "./contexts/ShoppingListContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import AutoCompleteContextProvider from "./contexts/AutoCompleteContext";
import ProductContextProvider from "./contexts/ProductContext";

// CSS/SASS
import "./sass/styles.scss";

function App() {
  return (
    <div className="App">
      <ShoppingListContextProvider>
        <CategoryContextProvider>
          <AutoCompleteContextProvider>
            <ProductContextProvider>
              <Header />
              <main className="container">
                <div className="row">
                  <ProductSearchBar />
                  <ProductsToBeSearchedList />
                  <StoreList />
                  <BottomButtons />
                </div>
              </main>
              <Footer />
            </ProductContextProvider>
          </AutoCompleteContextProvider>
        </CategoryContextProvider>
      </ShoppingListContextProvider>
    </div>
  );
}

export default App;
