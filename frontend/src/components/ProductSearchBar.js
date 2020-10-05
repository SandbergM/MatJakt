import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { CategoryContext } from "../contexts/CategoryContext";

import ProductInputField from './CustomInputFields/ProductInputField.js';
import ProductSelect from './CustomInputFields/ProductSelect.js';
import SearchBarHeader from './SearchBarHearder.js'
import EcologicalToggleButton from './CustomInputFields/EcologicalToggleButton.js'

export default function ProductSearchBar(props) {
  const { addProductToShoppingList, singleProductSearch } = useContext(ShoppingListContext);
  const { categories } = useContext(CategoryContext);
  const temporaryCountriesOfOrigin = [{ _id: 'Sverige', value: 'Sverige' }, { _id: 'Annat', value: 'Annat' }]
  const temporaryMeasurements = [{ _id: 'st', value: 'Styck' }, { _id: 'kg', value: 'Kilogram' }, { _id: 'l', value: 'Liter' }, { _id: 'Sverige', value: 'Sverige' }]

  const [product, setProduct] = useState(
    {
      name: "",
      quantity: 0,
      quantityType: "st",
      categoryId: 0,
      isEcological: false
    }
  )

  return (
    <div className="col-12 justify-content-center">
      <SearchBarHeader />
      <div
        id="matjakt-searchbar-content-container"
        className="d-flex justify-content-around mb-4"
      >
        <form id="products-search-form">
          <div className="row">
            <div className="col-12 col-md-12 col-xl-8 d-flex mb-2">
              <ProductInputField
                field={"name"}
                placeholder={"Sök efter produkt..."}
                type={"text"}
                product={product}
                handleChange={setProduct}
              />
            </div>
            <div className="col-12 col-md-12 col-xl-2 d-flex mb-2">
              <ProductInputField
                field={"quantity"}
                placeholder={"Volym"}
                type={"number"}
                product={product}
                handleChange={setProduct}
              />
            </div>
            <div className="col-12 col-md-12 col-xl-2 d-flex mb-2">
              <ProductSelect
                field={"quantityType"}
                placeholder={"Typ"}
                options={temporaryMeasurements}
                product={product}
                handleChange={setProduct}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3 d-flex mb-2">
              <ProductSelect
                field={"categoryId"}
                defaultOption={"Kategorier"}
                options={categories}
                product={product}
                handleChange={setProduct}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3 d-flex mb-2">
              <ProductSelect
                field={"countryOfOrigin"}
                defaultOption={"Välj ursprungsland"}
                options={temporaryCountriesOfOrigin}
                product={product}
                handleChange={setProduct}
              />
            </div>
            <div className="col-9 col-md-10 col-xl-5 d-flex mb-2">
              <EcologicalToggleButton
                field={"isEcological"}
                label={"Ekologisk"}
                product={product}
                handleChange={setProduct}
              />
            </div>
            <div className="col-3 col-md-2 col-xl-1 d-flex mb-2">
              <Button
                className="col-12 custom-searchbar-button matJaktLightGreen-bg matjaktWhite-text"
                onClick={() => {
                  addProductToShoppingList(product).then(
                    document.getElementById("products-search-form").reset()
                  );
                }}
              >
                <span className="button-icon ">&#x2b;</span>
              </Button>
            </div>
            {/*   <div className="col-8 offset-2 col-sm-6 offset-sm-3 col-lg-4 col-lg-3 offset-lg-7 offset-xl-7 offset-xl-6 d-flex justify-content-center">
              <Button id="generate-list-button" onClick={() => { singleProductSearch(product) }}>Hämta prisförslag</Button>
            </div> */}
            <div
              id="single-product-search-container"
              className="col-8 offset-2 col-sm-6 offset-sm-3 col-lg-4 col-lg-3 offset-lg-7 offset-xl-7 offset-xl-6 d-flex mt-2 justify-content-center"
            >
              <Button
                id="single-product-search-button"
              
                onClick={() => {
                  singleProductSearch(product);
                }}
                className="matjaktDarkGreen-bg drop-shadow"
              >
                Sök efter produkt
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}