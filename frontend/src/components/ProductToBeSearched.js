import React, { useContext, useState } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ProductToBeSearched(props) {
  const { removeProductToShoppingList } = useContext(ShoppingListContext);

  const [isBeingEdited, setIsBeingEdited] = useState(false);

  function editProduct() {}

  return (
    <div className="col-12 mt-2 mb-2 product-to-be-searched-item matjaktDarkGreen-text">
      <div className="row">
        <div className="col-11 align-items-center">
          {props.product.name} - {props.product.quantity}{" "}
          {props.product.quantityType ? props.product.quantityType : ""}
          {props.product.isEcological ? " - Ekologisk" : ""}
        </div>

        <div className="col-1 mb-1 thomas-list-icons pointer">
          <MdEdit onClick={editProduct()} />
          <MdDelete
            className="ml-1"
            onClick={() => removeProductToShoppingList(props.product)}
          />
        </div>
      </div>
    </div>
  );
}
