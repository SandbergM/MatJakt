import React, { useState, useContext, useEffect } from "react";
import { Input, Label, Button } from "reactstrap";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { AutoCompleteContext } from "../contexts/AutoCompleteContext";
import { CategoryContext } from "../contexts/CategoryContext";

export default function ProductSearchBar(props) {
  const { addProductToShoppingList, singleProductSearch } = useContext(ShoppingListContext);
  const { fetchAutoCompleteSuggestions, autoCompleteSuggestions } = useContext(AutoCompleteContext);
  const { categories } = useContext(CategoryContext);
  const [product, setProduct] = useState(initialState());

  function initialState() {
    return {
      name: "", quantity: null, quantityType: 'st',
      category: null, countryOfOrigin: "", isEcological: false,
    }
  }

  const submitProductSearch = () => {
    if (product['name'].length >= 3) {
      singleProductSearch(product);
      setProduct(initialState())
    }
  };

  useEffect(() => {
    fetchAutoCompleteSuggestions(product['name']).then()
  }, [product['name']])

  useEffect(() => {
    // TODO, just experimenting with async problems
    console.log(autoCompleteSuggestions);
  }, [autoCompleteSuggestions])

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value })
  };

  const clearFields = () => {
    document.getElementById("product-search-form").reset();
    setProduct(initialState());
  };

  const addProductToList = () => {
    if (product['name'].length > 1) {
      addProductToShoppingList(product).then(clearFields());
    }
  };

  return (
    <div className="col-12 justify-content-center">
      <div id="matjakt-searchbar-header" className="matjaktDarkGreen-bg">
        <p
          id="searchbar-header-title"
          className="matjaktWhite-text align-self-center"
        >
          Sök efter produkt
        </p>
      </div>
      <form id="product-search-form">
        <div
          id="matjakt-searchbar-content-container"
          className="d-flex justify-content-around mb-4"
        >
          <div className="row">
            <div className="col-xl-9 col-lg-6 col-md-12 mb-2">
              <Input
                placeholder="Sök efter produkt..."
                className="matjaktWhite-bg matjakt-inputfield oblique matjakt-clearable"
                onChange={(e) => { handleChange('name', e.target.value); }}
              />
            </div>
            <div className="col-xl-3 col-lg-6 col-md-12 d-flex justify-content-between mb-2">
              <Input
                type="number"
                step="0.01"
                placeholder="Volym"
                className="matjakt-inputfield oblique small-inputfield matjakt-clearable"
                onChange={(e) => { handleChange('quantity', e.target.value); }}
              />
              <Input
                type="select"
                defaultValue
                placeholder="Volym"
                className="matjakt-inputfield-select oblique small-inputfield matjakt-clearable"
                onChange={(e) => { handleChange('quantityType', e.target.value); }}
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
                className="matjakt-inputfield-select oblique small-inputfield matjakt-clearable"
                onChange={(e) => { handleChange('category', e.target.value); }}
              >
                <option defaultValue value="">
                  Välj kategori
                </option>
                {categories.map((x, index) => {
                  return (
                    <option key={index} value={x._id}>
                      {" "}
                      {x.categoryName}{" "}
                    </option>
                  );
                })}
              </Input>
              <Input
                type="select"
                placeholder="Volym"
                className="matjakt-inputfield-select oblique small-inputfield matjakt-clearable"
                onChange={(e) => { handleChange('countryOfOrigin', e.target.value); }}
              >
                <option defaultValue value="">
                  Välj ursprungsland
                </option>
                {/* TODO, countries should come as props */}
              </Input>
            </div>

            <div className="small-inputfield col-9 col-lg-4 col-xl-2 justify-content-between d-flex mb-3">
              <Button
                className="custom-searchbar-button matjaktWhite-bg"
                onClick={() => { handleChange('isEcological', !product['isEcological']); }}
              >
                <span>
                  {product['isEcological'] ? (
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
                onClick={() => {
                  addProductToList();
                }}
              >
                <span className="button-icon ">&#x2b;</span>
              </Button>
            </div>
            <div
              id="single-product-search-container"
              className="col-8 offset-2 col-sm-6 offset-sm-3 col-lg-4 col-lg-3 offset-lg-7 offset-xl-7 offset-xl-6 d-flex justify-content-center"
            >
              <Button
                id="single-product-search-button"
                className="matjaktDarkGreen-bg"
              >
                Sök efter produkt
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
