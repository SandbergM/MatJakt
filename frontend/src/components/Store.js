import React, { useEffect, useState, useContext } from "react";
import ProductsList from "../components/ProductsList";
import { Collapse, Card } from "reactstrap";
import { ShoppingListContext } from "../contexts/ShoppingListContext";

export default function Store(props) {
  const {
    generatedShoppingList,
    addSelectedProductToGeneratedShoppingList,
    singleProductSearchResult,
  } = useContext(ShoppingListContext);

  const [isOpen, setIsOpen] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    if (generatedShoppingList[props.store._id]) {
      generatedShoppingList[props.store._id].map((product) => {
        sum += product.price;
      });
    }
    setTotalPrice(sum);
  }, [generatedShoppingList[props.store._id]]);

  return (
    <div className=" col-lg-4 col-12 mb-5">
      <h4
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="store-name"
        align="center"
        style={{
          backgroundColor: `${props.store.color}`,
        }}
      >
        {props.store.name}
      </h4>
      <Collapse isOpen={isOpen}>
        <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.74" }}>
          <div className="mb-5">
            <ProductsList
              products={singleProductSearchResult[props.store._id] || []}
              handleChange={addSelectedProductToGeneratedShoppingList}
            />
          </div>
          <div>
            <ProductsList
              products={generatedShoppingList[props.store._id] || []}
              handleChange={addSelectedProductToGeneratedShoppingList}
            />
          </div>
        </Card>
      </Collapse>
      <div className="text-center total-price matjaktDarkGreen-text">
        {Math.round(totalPrice)} <span className="sek">SEK</span>
      </div>
    </div>
  );
}
