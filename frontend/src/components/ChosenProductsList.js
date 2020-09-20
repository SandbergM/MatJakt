import React from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import ProductToBeSearched from "./ProductToBeSearched";

export default class ChosenProductsList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ShoppingListContext.Consumer>
        {(shoppingListContext) => {
          const { shoppingList, onRemoveProductFromList } = shoppingListContext;
          return (
            <div className="col-12 mb-4 mt-4">
              <div id="product-to-be-searched-list">
                {shoppingList.map((product) => {
                  return (
                    <ProductToBeSearched
                      product={product}
                      onRemoveProductFromList={onRemoveProductFromList}
                    />
                  );
                })}
              </div>
            </div>
          );
        }}
      </ShoppingListContext.Consumer>
    );
  }
}
