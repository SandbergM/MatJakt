import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { Collapse, Card } from "reactstrap";

export default function Store(props) {
  const [isOpen, setIsOpen] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    props.generatedShoppingList.map(product => {
      sum += product.price
    });
    setTotalPrice(sum);
  },[props.generatedShoppingList])


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
        <Card>
          <ProductsList mb-3 products={props.singleProductSearchResults} />
          <ProductsList products={props.generatedShoppingList} />
        </Card>
      </Collapse>
      <div className="text-center total-price matjaktDarkGreen-text">
        {totalPrice} <span className="sek">SEK</span>
      </div>
    </div>
  );
}
