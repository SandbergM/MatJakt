import React, { useContext, useState } from "react";
import { MdDelete, MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { ShoppingListContext } from "../contexts/ShoppingListContext";

function Product() {
  const { generatedShoppingList } = useContext(ShoppingListContext);
  let [amountToBuy, setAmountToBuy] = useState(1)
  let products = generatedShoppingList;
  const add = () => {
    
    setAmountToBuy(amountToBuy => amountToBuy + 1)
    
  }
  const subtract = () => {
    
    if (amountToBuy > 0) {
      setAmountToBuy((amountToBuy) => amountToBuy - 1);
      // console.log(amountToBuy);
    }
  };

  if (products) {
    const list = () => {
      return products.map((product, i) => {
        return (
          <div className="row product" key={i}>
            <div
              className="col-3 product-image"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            >
              <div className="icons">
                <div className="add" onClick={add}>
                  <MdAddCircle className="white-icon" />
                </div>
                <div className="remove" onClick={subtract}>
                  <MdRemoveCircle className="white-icon" />
                </div>
              </div>
            </div>

            <div className="col-7">
              <div className="row align-items-start">
                <div className="col product-name">{product.name}</div>
              </div>

              <div className="row align-items-center mt-1">
                <div className="col comparison-price">
                  <span className="product-brand">{product.brand} </span> |
                  <span className="comparison-text"> Jfp: </span>
                  {product.pricePerUnit} SEK / {product.comparisonUnit}
                </div>
              </div>

              <div className="row align-items-end">
                <div className="col product-price">
                  {product.packagingSize} {product.quantityType} för{" "}
                  <span className="price-text"> {product.price} SEK</span>
                </div>
              </div>

              <div className="divider mt-3 mb-2"></div>
            </div>

            <div className="delete align-items-center right-icons">
              <div className="delete amount">{amountToBuy}</div>
              <MdDelete />
            </div>
          </div>
        );
      });
    };

    return <>{list()}</>;
  }

  return (
    <div>
      <h3 className="golden m-2"> No products </h3>
    </div>
  );
}

export default Product;
