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
import BottomButtons from "./components/BottomButtons";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container">
        <div className="row">
          <ProductSearchBar />
        </div>
        <div className="row">
          <List />
        </div>
        <div className="row justify-content-center">
          <BottomButtons />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
