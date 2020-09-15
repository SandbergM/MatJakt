import React, { useState } from "react";
import { Input, Label, Button } from 'reactstrap';

export default function ProductSearchBar(props) {

  const [productName, setProductName] = useState();
  const [quantity, setQuantity] = useState();
  const [quantityType, setQuantityType] = useState();
  const [category, setCategory] = useState();
  const [countryOfOrigin, setCountryOfOrigin] = useState();
  const [isEcological, setIsEcological] = useState(false);

  const submitProdctSearch = async (e) => {
    // TODO
  };

  const addProductToList = async (e) => {
    console.log(`I added something to the list, yay`);
  };

  const toggleEco = () => {
    setIsEcological(isEcological ? false : true)
  };

  const autoCompleteHelper = async (e) => {
    if (e.length >= 3) {
      setProductName(e)
      console.log(`Fetching top 5 products with ${e} in the name`); // TODO
    }
  }

  return (
    <div
      id="matjakt-searchbar-main"
      className="container-fluid row justify-content-center"
    >
      <div
        id="matjakt-searchbar-header"
        className="matjatkDarkGreen-bg col-lg-10"
        style={{ display: "flex" }}
      >
        <p
          id="searchbar-header-title"
          className="matjaktWhite-text align-self-center"
        >
          Sök efter produkt
        </p>
      </div>
      <div
        id="matjakt-searchbar-content-container"
        className="col-lg-10 d-flex justify-content-around">
        <div className="row container-fluid">
          <div className="col-xl-9 col-lg-6 col-md-12">
            <Input
              placeholder="Sök efter produkt..."
              className="matjaktWhite-bg matjakt-inputfield oblique"
              onChange={(e) => autoCompleteHelper(e.target.value)} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 d-flex justify-content-between">
            <Input placeholder="Volym" className="matjakt-inputfield oblique small-inputfield"
              onChange={(e) => setQuantity(e.target.value)} />
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setQuantityType(e.target.value)}>
              <option defaultValue value={"kg"}> Kilogram </option>
              <option value={"gr"}> Gram </option>
              <option value={"ml"}> Milliliter </option>
              <option value={"l"}> Liter </option>
              <option value={"st"}> Styck </option>
            </Input>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12 d-flex justify-content-between">
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setCategory(e.target.value)}>
              <option selected disabled>Kategori</option> {/* TODO, Categories should come as props */}
            </Input>
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setCountryOfOrigin(e.target.value)}>
              <option selected disabled>Land</option> {/* TODO, countries should come as props */}
            </Input>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-12 justify-content-between d-flex ">
            <div id="matjakt-checkbox-container" className="small-inputfield ml-1 ">
              <Button id="custom-ecological-toggle-button"
                onClick={toggleEco}
              ><span >{isEcological ? <span id="ecological-checkmark">&#10003;</span> : ""}</span></Button>
              <Label className="ml-3" id="custom-ecological-toggle-button-label">Endast ekologiskt</Label>
            </div>
            <div className="matjakt-button-container small-inputfield flex-row-reverse mr-2">
              <Button id="custom-add-to-list-button" onClick={addProductToList}>
                <span>+</span>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}
