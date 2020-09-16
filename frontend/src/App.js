import React from 'react';
import { Button } from "reactstrap";

// COMPONENTS
import Footer from "./components/Footer";
import Header from "./components/Header";

// CSS/SASS
import "./sass/styles.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Button color="danger">Matjakt in the house!</Button>
      <Footer />
    </div>
  );
}

export default App;
