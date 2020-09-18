import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contextProdivers/ProductContextProvider";

export default function ProductToBeSearched(props) {
  const { removeProductToSearchFromList } = useContext(ProductContext);
  return (
    <div className="col-12 mt-3 mb-3 product-to-be-searched-item matjaktDarkGreen-text">
      <div className="row">
        <div className="col-11 align-items-center">
          {props.product.name} -{" "}
          {props.product.quantity ? props.product.quantity : ""}
          {props.product.quantityType ? props.product.quantityType : ""} -
          {props.product.isEcological ? "Ecologisk" : ""}
        </div>
        <div
          className="col-1 d-flex justify-content-around align-content-center pointer align-items-center"
          onClick={() => removeProductToSearchFromList(props.product)}
        >
          X
        </div>
      </div>
    </div>
  );
}
