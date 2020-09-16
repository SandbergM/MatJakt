import React from "react";
//import { Button } from "reactstrap";

// COMPONENTS
//import Footer from "./components/Footer";
//import Header from "./components/Header";
import List from "./components/List";

// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductSearchBar from "./components/ProductSearchBar";

// CSS/SASS
import "./sass/styles.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductSearchBar />
      <List />
      <Footer />
    </div>
  );
}

export default App;
