import React, { useContext } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import ProductsToBeSearched from "./ProductToBeSearched";
import { Button } from "reactstrap";

export default function ProductsToBeSearchedList() {
  const { productsToBeSearched, fetchGeneratedShoppingLists } = useContext(
    ShoppingListContext
  );

  const list = () => {
    return productsToBeSearched.map((product, index) => {
      return <ProductsToBeSearched key={index} product={product} />;
    });
  };
  
  return (
    <div className="col-12 mb-5 mt-4">
      <div className="col-12" id="product-to-be-searched-list">
        {list()}
      </div>
      <div className="col-8 offset-2 col-sm-6 offset-sm-3 col-lg-4 col-lg-3 offset-lg-7 offset-xl-7 offset-xl-6 d-flex justify-content-center">
        <Button
          id="generate-list-button"
          onClick={() => {
            fetchGeneratedShoppingLists();
          }}
        >
          Hämta prisförslag
        </Button>
      </div>
    </div>
  );
}
