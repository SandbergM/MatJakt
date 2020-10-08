import React, { useContext, useState } from "react";
import { Input, Button } from "reactstrap";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

export default function ProductToBeSearched(props) {
  const {
    removeProductFromShoppingList,
  } = useContext(ShoppingListContext);

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const toggleEdit = () => setIsBeingEdited(!isBeingEdited);

  const [isEcological, setIsEcological] = useState(props.product.isEcological);

  const editProductInList = () => {
    console.log(props);
    /*     if (props.product.name.length > 1) {
      addProductToShoppingList({
        //add the new product to the shopping list
        name: props.product.name,
        category: props.product.category,
        quantity: props.product.quantity,
        quantityType: props.product.quantityType,
        isEcological: isEcological,
        countryOfOrigin: props.product.countryOfOrigin,
      })
        //.then(removeProductToShoppingList(props)) //remove the old product
        .then(toggleEdit); */
    toggleEdit();
    //}
  };

  return (
    <div className="col-12 mt-2 mb-2 product-to-be-searched-item matjaktDarkGreen-text">
      <div className="row">
        <div className="col-11 align-items-center d-flex">
          {!isBeingEdited ? (
            <div className="mr-1">{props.product.name} -</div>
          ) : (
            <Input
              placeholder={props.product.name}
              className="input-edit mr-1"
            />
          )}

          {!isBeingEdited ? (
            <div className="mr-1">{props.product.quantity} -</div>
          ) : (
            <Input
              placeholder={props.product.quantity}
              className="input-edit-quantity mr-1"
            />
          )}

          {!isBeingEdited ? (
            <div className="mr-1">
              {props.product.quantityType ? props.product.quantityType : " "}
            </div>
          ) : (
            <Input
              placeholder={props.product.quantityType}
              className="input-edit-quantity-type mr-1"
            />
          )}

          {!isBeingEdited ? (
            <div> {isEcological ? "- Ekologisk" : ""} </div>
          ) : (
            <div className="small-inputfield d-flex">
              <Button
                className="ecological-button matjaktWhite-bg"
                onClick={() => {
                  setIsEcological(!isEcological);
                }}
              >
                {isEcological ? (
                  <span className="matJaktLightGreen-text eco-span">
                    &#10003;
                  </span>
                ) : (
                  ""
                )}
              </Button>
              <div className="ml-2 ecological-text">Ekologisk</div>
            </div>
          )}
        </div>

        <div className="col-1 mb-1 thomas-list-icons pointer">
          {isBeingEdited ? (
            <MdSave onClick={toggleEdit} />
          ) : (
            <MdEdit
              onClick={() => {
                editProductInList();
              }}
            />
          )}
          <MdDelete
            className="ml-1 matJaktLightGreen-text"
            onClick={() => removeProductFromShoppingList(props.product)}
          />
        </div>
      </div>
    </div>
  );
}
