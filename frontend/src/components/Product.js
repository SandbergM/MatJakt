import React, { useContext, useState } from "react";
import { MdDelete, MdAddCircle, MdRemoveCircle } from "react-icons/md";
import PriceFormater from "../helpers/PriceFormater";
import { ShoppingListContext } from "../contexts/ShoppingListContext";

export default function Product(props) {
  const {
    updateGeneratedShoppingList,
    addSelectedProductToGeneratedShoppingList,
    removeFromList,
  } = useContext(ShoppingListContext);
  let [amountToBuy, setAmountToBuy] = useState(1);

  const removeProduct = () => {
    removeFromList(props.product, props.type);
  };

  const add = () => {
    setAmountToBuy((amountToBuy) => amountToBuy + 1);
    updateGeneratedShoppingList(
      props.product.storeId,
      props.product,
      "increment"
    );
  };
  const subtract = () => {
    if (amountToBuy > 0) {
      setAmountToBuy((amountToBuy) => amountToBuy - 1);
    }
    updateGeneratedShoppingList(
      props.product.storeId,
      props.product,
      "decrease"
    );
  };

  return (
    <div className="row product">
      <div
        className="col-3 product-image"
        style={{ backgroundImage: `url(${props.product.imageUrl})` }}
      >
        <div className="icons">
          {props.type === "chosen" ? (
            <div>
              <div
                className="add"
                onClick={() => {
                  add();
                }}
              >
                <MdAddCircle className="white-icon" />
              </div>
              <div
                className="remove"
                onClick={() => {
                  subtract();
                }}
              >
                <MdRemoveCircle className="white-icon" />
              </div>
            </div>
          ) : (
            ""
          )}
          {props.type === "searched" ? (
            <div>
              <div
                className="add"
                onClick={() => {
                  addSelectedProductToGeneratedShoppingList(
                    props.product.storeId,
                    props.product
                  );
                }}
              >
                <MdAddCircle className="white-icon" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="col-7">
        <div className="row align-items-start">
          <div className="col product-name">{props.product.name}</div>
        </div>
        <div className="row align-items-center mt-1">
          <div className="col comparison-price">
            <span className="product-brand">{props.product.brand} </span> |
            <span className="comparison-text"> Jfp: </span>
            {PriceFormater.standardizedPriceFormat(
              props.product.pricePerUnit
            )}{" "}
            SEK /{" "}
            {PriceFormater.standardizedPriceFormat(
              props.product.comparisonUnit
            )}
          </div>
        </div>
        <div className="row align-items-end">
          <div className="col product-price">
            {props.product.packagingSize * amountToBuy} {props.product.quantityType} för{" "}
            <span className="price-text">
              {" "}
              {PriceFormater.standardizedPriceFormat(props.product.price * amountToBuy)} SEK
            </span>
          </div>
        </div>
        <div className="divider mt-3 mb-2"></div>
      </div>
      <div
        className="delete align-items-center right-icons"
        onClick={() => {
          removeProduct();
        }}
      >
        <div className="delete amount">{amountToBuy}</div>
        <MdDelete />
      </div>
    </div>
  );
}
