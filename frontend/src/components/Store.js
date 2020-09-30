import React, { useState, useContext } from "react";
import ProductsList from "../components/ProductsList";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { Collapse, Card, CardBody } from "reactstrap";

export default function Store(props) {
  const [isOpen, setIsOpen] = useState(true);
  const { handleChangeNewProduct } = useContext(ShoppingListContext);

  return (
    <div className=" col-lg-4 col-12 mb-5">
      <h4
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="store-name"
        align="center"
        style={{ backgroundColor: `${props.store.color}` }}
      >
        {props.store.name}
      </h4>
      <Collapse isOpen={isOpen}>
        <Card>
          <ProductsList mb-3 products={props.singleProductSearchResults} />
          <ProductsList
            products={props.generatedShoppingList}
            handleChange={handleChangeNewProduct}
          />
        </Card>
      </Collapse>
    </div>
  );
}
