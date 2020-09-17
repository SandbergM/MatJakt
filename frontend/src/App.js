import React from "react";
//import { Button } from "reactstrap";

// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header";
import List from "./components/List";
import ProductSearchBar from "./components/ProductSearchBar";

// CONTEXTPROVIDERS
import ProductContextProvider from "./contextProdivers/ProductContextProvider";

// CSS/SASS
import "./sass/styles.scss";

function App() {
  return (
    <div className="App">
      <ProductContextProvider>
        <Header />
        <main className="container">
          <div className="row">
            <ProductSearchBar />
            <List />
          </div>
        </main>
        <Footer />
      </ProductContextProvider>
    </div>
  );
}

export default App;
