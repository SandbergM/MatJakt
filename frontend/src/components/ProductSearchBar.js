import React, { useState, useContext } from "react";
import { Input, Label, Button } from "reactstrap";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { AutoCompleteContext } from "../contexts/AutoCompleteContext";

export default class ProductSearchBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product: this.initialState(),
      productCategories: [],
    };
  }

  initialState() {
    return {
      name: "",
      quantity: "",
      quantityType: "",
      isEcological: false,
      categoryId: "",
    };
  }

  async handleChange(field, value, onFetchSuggestions) {
    if (field === "name" && value.length > 3) {
      onFetchSuggestions(value);
    }
    await this.setState((state) => ((state.product[field] = value), state));
  }

  submitAndClearFields(onAddProductToList) {
    console.log(this.state.product);
    onAddProductToList(this.state.product);
    this.setState({ product: this.initialState() });
    document.getElementById("product-search-form").reset();
  }

  render() {
    return (
      <ShoppingListContext.Consumer>
        {(shoppingListContext) => (
          <AutoCompleteContext.Consumer>
            {(autoCompleteContext) => (
              <CategoryContext.Consumer>
                {(categoryContext) => {
                  const { onAddProductToList } = shoppingListContext;
                  const { categories } = categoryContext;
                  const {
                    autoCompleteSuggestions,
                    onFetchSuggestions,
                  } = autoCompleteContext;
                  return (
                    <div className="col-12 justify-content-center">
                      <div
                        id="matjakt-searchbar-header"
                        className="matjaktkDarkGreen-bg"
                      >
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
                                onChange={(e) => {
                                  this.handleChange(
                                    "name",
                                    e.target.value,
                                    onFetchSuggestions
                                  );
                                }}
                              />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-12 d-flex justify-content-between mb-2">
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="Volym"
                                className="matjakt-inputfield oblique small-inputfield matjakt-clearable"
                                onChange={(e) => {
                                  this.handleChange("quantity", e.target.value);
                                }}
                              />
                              <Input
                                type="select"
                                defaultValue
                                placeholder="Volym"
                                className="matjakt-inputfield-select oblique small-inputfield matjakt-clearable"
                                onChange={(e) => {
                                  this.handleChange(
                                    "quantityType",
                                    e.target.value
                                  );
                                }}
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
                                className="matjakt-inputfield-select oblique small-inputfield matjakt-clearable"
                                onChange={(e) => {
                                  this.handleChange(
                                    "categoryId",
                                    e.target.value
                                  );
                                }}
                              >
                                <option defaultValue value="">
                                  Välj kategori
                                </option>
                                {categories.map((x) => (
                                  <option value={x._id}>
                                    {x.categoryName}
                                  </option>
                                ))}
                              </Input>
                              <Input
                                type="select"
                                placeholder="Volym"
                                className="matjakt-inputfield-select oblique small-inputfield matjakt-clearable"
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
                                onClick={(e) => {
                                  this.handleChange(
                                    "isEcological",
                                    !this.state.product.isEcological
                                  );
                                }}
                              >
                                <span>
                                  {this.state.product.isEcological ? (
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
                                onClick={(e) =>
                                  this.submitAndClearFields(onAddProductToList)
                                }
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
                                className="matjaktkDarkGreen-bg"
                                onClick={async () => {
                                  await onAddProductToList(this.state.product);
                                }}
                              >
                                Sök efter produkt
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  );
                }}
              </CategoryContext.Consumer>
            )}
          </AutoCompleteContext.Consumer>
        )}
      </ShoppingListContext.Consumer>
    );
  }
}
