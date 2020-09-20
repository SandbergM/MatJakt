import React, { useState, useContext, useEffect } from "react";

export default class ProductToBeSearched extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="col-12 mt-3 mb-3 product-to-be-searched-item matjaktDarkGreen-text">
        <div className="row">
          <div className="col-11 align-items-center">
            {this.props.product.name ? `${this.props.product.name}` : ""}
            {this.props.product.quantity ? `  -  ${this.props.product.quantity} ${this.props.product.quantityType}` : ""}
            {this.props.product.isEcological ? "  -  Ekologisk" : ""}
          </div>
          <div
            className="col-1 d-flex justify-content-around align-content-center pointer align-items-center"
            onClick={() => {
              this.props.onRemoveProductFromList(this.props.product);
            }}
          >
            X
          </div>
        </div>
      </div>
    );
  }
}
