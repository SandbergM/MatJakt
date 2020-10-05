import React, { useContext, useState  } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";

import ProductInputField from "./CustomInputFields/ProductInputField.js";
import ProductSelect from "./CustomInputFields/ProductSelect.js";
import EcologicalToggleButton from "./CustomInputFields/EcologicalToggleButton.js";

export default function ProductToBeSearched(props) {
  const { editProductInShoppingList, removeProductToShoppingList } = useContext(
    ShoppingListContext
  );

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  //const [isEcological, setIsEcological] = useState(props.product.isEcological);

  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    quantityType: "st",
    categoryId: 0,
    isEcological: false,
  });

  const temporaryMeasurements = [
    { _id: "st", value: "Styck" },
    { _id: "kg", value: "Kilogram" },
    { _id: "l", value: "Liter" },
    { _id: "Sverige", value: "Sverige" },
  ];

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
    //console.log(product)
  }

  const editProductInList = (oldProduct, editedProduct) => {
    console.log(props);
    if (editedProduct.name.length > 1) {
      editProductInShoppingList(oldProduct, editedProduct);        
      toggleEdit();
    }
  }

/*     useEffect(() => {
     addProductToShoppingList({
       //add the new product to the shopping list
       name: props.product.name,
       category: props.product.category,
       quantity: props.product.quantity,
       quantityType: props.product.quantityType,
       isEcological: isEcological,
       countryOfOrigin: props.product.countryOfOrigin,
     });
    }, [props.product]); */


  return (
    <div className="col-12 mt-2 mb-2 product-to-be-searched-item matjaktDarkGreen-text">
      <div className="row">
        <div className="col-11 align-items-center d-flex">
          {!isBeingEdited ? (
            <div className="mr-1">{props.product.name} -</div>
          ) : (
            <div className="col-4 d-flex" id="input-edit">
              <ProductInputField
                field={"name"}
                placeholder={props.product.name}
                type={"text"}
                product={props.product}
                handleChange={setProduct}
              />
            </div>
          )}

          {!isBeingEdited ? (
            <div className="mr-1">{props.product.quantity} -</div>
          ) : (
            <div className="col-2 d-flex" id="input-edit-quantity">
              <ProductInputField
                field={"quantity"}
                placeholder={props.product.quantity}
                type={"number"}
                product={props.product}
                handleChange={setProduct}
              />
            </div>
          )}

          {!isBeingEdited ? (
            <div className="mr-1">
              {props.product.quantityType ? props.product.quantityType : " "}
            </div>
          ) : (
            <div
              className="col-3 input-edit-quantity-type d-flex"
              id="input-edit-quantity-type"
            >
              <ProductSelect
                field={"quantityType"}
                placeholder={props.product.quantityType}
                options={temporaryMeasurements}
                product={props.product}
                handleChange={setProduct}
              />
            </div>
          )}

          {!isBeingEdited ? (
            <div> {props.product.isEcological ? "- Ekologisk" : ""} </div>
          ) : (
            <div className="col-2" id="eko-button-input">
              <EcologicalToggleButton
                field={"isEcological"}
                label={"Ekologisk"}
                product={props.product}
                handleChange={setProduct}
              />
            </div>

            /* <div className="small-inputfield d-flex">
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
            </div> */
          )}
        </div>

        <div className="col-1 mb-1 thomas-list-icons pointer">
          {!isBeingEdited ? (
             <MdEdit
              onClick={
                () => {toggleEdit()}
              }
            />
            ) : (
              <MdSave onClick={() => editProductInList(props.index, props.product, product)} />
          )}
          <MdDelete
            className="ml-1 matJaktLightGreen-text"
            onClick={() => removeProductToShoppingList(props.product)}
          />
        </div>
      </div>
    </div>
  );
}
