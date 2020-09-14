import React from "react";

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
      <Footer />
    </div>
  );
}

export default App;
