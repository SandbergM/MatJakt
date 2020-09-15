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
    console.log(`I searched for ${productName}`);
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
      console.log(`Fetching top X number of products with ${e} in the name`); // TODO
    }
  }

  return (
    <div
      id="matjakt-searchbar-main"
      className="container row justify-content-center">
      <div
        id="matjakt-searchbar-header"
        className="matjatkDarkGreen-bg col-lg-10">
        <p
          id="searchbar-header-title"
          className="matjaktWhite-text align-self-center">
          Sök efter produkt
        </p>
      </div>
      <div
        id="matjakt-searchbar-content-container"
        className="col-lg-10 d-flex justify-content-around">
        <div className="row container-fluid">
          <div className="col-xl-9 col-lg-6 col-md-12 mb-2">
            <Input
              placeholder="Sök efter produkt..."
              className="matjaktWhite-bg matjakt-inputfield oblique"
              onChange={(e) => autoCompleteHelper(e.target.value)} />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 d-flex justify-content-between mb-2">
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
          <div className="col-xl-5 col-lg-5 col-md-12 d-flex justify-content-between mb-2">
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setCategory(e.target.value)}>
              <option selected disabled>Välj kategori</option> {/* TODO, Categories should come as props */}
            </Input>
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setCountryOfOrigin(e.target.value)}>
              <option selected disabled>Välj ursprungsland</option> {/* TODO, countries should come as props */}
            </Input>
          </div>
          <div className="col-xl-7 col-lg-7 col-md-12 justify-content-between d-flex mb-4">
            <div className="small-inputfield ml-1">
              <Label className="ml-3 searchbar-label matjatkDarkGreen-text oblique">Ekologisk</Label>
              <Button className="custom-searchbar-button matjaktWhite-bg ml-3" onClick={toggleEco}>
                <span >{isEcological ? <span className="matJaktLightGreen-text">&#10003;</span> : ""}</span>
              </Button>
            </div>
            <div className="matjakt-button-container small-inputfield flex-row-reverse mr-4">
              <Button className="custom-searchbar-button matJaktLightGreen-bg matjaktWhite-text" onClick={addProductToList}>
                <span>+</span>
              </Button>
            </div>
          </div>
          <div id="single-product-search-container" className="col-xl-3 offset-xl-9 col-lg-5 offset-lg-7 col-md-10 offset-md-1 col-sm-12  ">
            <Button id="single-product-search-button"
              className="matjatkDarkGreen-bg"
              onClick={submitProdctSearch}>
              Sök efter produkt</Button>
          </div>
        </div>
      </div>
    </div >
  );
}
