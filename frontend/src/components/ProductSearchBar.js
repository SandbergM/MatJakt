import React, { useState } from "react";
import { Input, Label, Button } from "reactstrap";

export default function ProductSearchBar(props) {
  const [productName, setProductName] = useState();
  const [quantity, setQuantity] = useState();
  const [quantityType, setQuantityType] = useState("kg");
  const [category, setCategory] = useState();
  const [countryOfOrigin, setCountryOfOrigin] = useState();
  const [isEcological, setIsEcological] = useState(false);

  const submitProdctSearch = async (e) => {
    if (productName && productName.length >= 3) {
      console.log(
        `I searched for ${productName}, ${quantity}, ${quantityType} , ${category}, ${countryOfOrigin}`
      );
    }
  };

  const addProductToList = async (e) => {
    console.log(`I added something to the list, yay`);
  };

  const toggleEco = () => {
    setIsEcological(isEcological ? false : true);
  };

  const autoCompleteHelper = async (e) => {
    if (e.length >= 3) {
      setProductName(e);
      console.log(`Fetching top X number of products with ${e} in the name`); // TODO
    }
  };

  return (
    <div className="col-12 justify-content-center">
      <div id="matjakt-searchbar-header" className="matjaktkDarkGreen-bg">
        <p
          id="searchbar-header-title"
          className="matjaktWhite-text align-self-center"
        >
          Sök efter produkt
        </p>
      </div>
      <div
        id="matjakt-searchbar-content-container"
        className="d-flex justify-content-around mb-4"
      >
        <div className="row">
          <div className="col-xl-9 col-lg-6 col-md-12 mb-2">
            <Input
              placeholder="Sök efter produkt..."
              className="matjaktWhite-bg matjakt-inputfield oblique"
              onChange={(e) => autoCompleteHelper(e.target.value)}
            />
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 d-flex justify-content-between mb-2">
            <Input
              placeholder="Volym"
              className="matjakt-inputfield oblique small-inputfield"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              type="select"
              defaultValue
              placeholder="Volym"
              className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setQuantityType(e.target.value)}
            >
              <option value={"kg"}> Kilogram </option>
              <option value={"gr"}> Gram </option>
              <option value={"ml"}> Milliliter </option>
              <option value={"l"}> Liter </option>
              <option value={"st"}> Styck </option>
            </Input>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12 d-flex justify-content-between mb-2">
            <Input
              type="select"
              placeholder="Volym"
              className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option defaultValue value="">
                Välj kategori
              </option>{" "}
              {/* TODO, Categories should come as props */}
            </Input>
            <Input
              type="select"
              placeholder="Volym"
              className="matjakt-inputfield-select oblique small-inputfield"
              onChange={(e) => setCountryOfOrigin(e.target.value)}
            >
              <option defaultValue value="">
                Välj ursprungsland
              </option>{" "}
              {/* TODO, countries should come as props */}
            </Input>
          </div>

          <div className="small-inputfield col-9 col-xl-2 justify-content-between d-flex mb-3">
            <Button
              className="custom-searchbar-button matjaktWhite-bg"
              onClick={toggleEco}
            >
              <span>
                {isEcological ? (
                  <span className="matJaktLightGreen-text button-icon">
                    &#10003;
                  </span>
                ) : (
                  ""
                )}
              </span>
            </Button>
            <Label className="ml-3 searchbar-label matjatkkDarkGreen-text oblique">
              Ekologisk
            </Label>
          </div>
          <div className="matjakt-button-container small-inputfield col-3 col-xl-2 offset-xl-3 mb-3 d-flex justify-content-end">
            <Button
              className="custom-searchbar-button matJaktLightGreen-bg matjaktWhite-text"
              onClick={addProductToList}
            >
              <span className="button-icon ">&#x2b;</span>
            </Button>
          </div>
          <div
            id="single-product-search-container"
            className="col-8 col-sm-6 col-md-6 col-lg-4 col-xl-3 offset-2 offset-md-6 offset-lg-8 offset-xl-7 d-flex justify-content-center"
          >
            <Button
              id="single-product-search-button"
              className="matjaktkDarkGreen-bg"
              onClick={submitProdctSearch}
            >
              Sök efter produkt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
