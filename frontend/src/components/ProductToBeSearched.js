import React, { useContext, useState } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

import ProductInputField from "./CustomInputFields/ProductInputField.js";
import ProductSelect from "./CustomInputFields/ProductSelect.js";
import EcologicalToggleButton from "./CustomInputFields/EcologicalToggleButton.js";

export default function ProductToBeSearched(props) {
  const { editProductInShoppingList, removeProductFromShoppingList } = useContext(
    ShoppingListContext
  );

  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const [product, setProduct] = useState(props.product);

  const temporaryMeasurements = [
    { _id: "st", value: "Styck" },
    { _id: "kg", value: "Kilogram" },
    { _id: "l", value: "Liter" },
  ];

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };

  const editProductInList = (index, editedProduct) => {
    if (editedProduct.name.length > 1) {
      editProductInShoppingList(index, editedProduct);
      toggleEdit();
    }
  };

  return (
    <div className="col-12 mt-2 mb-2 product-to-be-searched-item matjaktDarkGreen-text">
      <div className="row">
        <div className="col-11 align-items-center d-flex">
          {!isBeingEdited ? (
            <div className="mr-1">{product.name} -</div>
          ) : (
              <div className="col-4 d-flex" id="input-edit">
                <ProductInputField
                  field={"name"}
                  placeholder={product.name}
                  value={product.name}
                  type={"text"}
                  product={product}
                  handleChange={setProduct}
                />
              </div>
            )}

          {!isBeingEdited ? (
            <div className="mr-1">{product.quantity} -</div>
          ) : (
              <div className="col-2 d-flex" id="input-edit-quantity">
                <ProductInputField
                  field={"quantity"}
                  placeholder={product.quantity}
                  value={product.quantity}
                  type={"number"}
                  product={product}
                  handleChange={setProduct}
                />
              </div>
            )}

          {!isBeingEdited ? (
            <div className="mr-1">
              {product.quantityType ? product.quantityType : " "}
            </div>
          ) : (
              <div
                className="col-3 input-edit-quantity-type d-flex"
                id="input-edit-quantity-type"
              >
                <ProductSelect
                  field={"quantityType"}
                  placeholder={product.quantityType}
                  value={product.quantityType}
                  options={temporaryMeasurements}
                  product={product}
                  handleChange={setProduct}
                />
              </div>
            )}

          {!isBeingEdited ? (
            <div> {product.isEcological ? "- Ekologisk" : ""} </div>
          ) : (
              <div className="col-2" id="eko-button-input">
                <EcologicalToggleButton
                  field={"isEcological"}
                  label={"Ekologisk"}
                  product={product}
                  value={product.isEcological}
                  handleChange={setProduct}
                />
              </div>
            )}
        </div>

        <div className="col-1 mb-1 thomas-list-icons pointer">
          {!isBeingEdited ? (
            <MdEdit
              onClick={() => {
                toggleEdit();
              }}
            />
          ) : (
              <MdSave
                onClick={() =>
                  editProductInList(props.index, product)
                }
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