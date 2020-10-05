import React from "react";
import Product from "../components/Product";

export default function ProductsList(props) {
  return (
    <div className="search-results">
      <div className="results">
        {props.type === "search"
          ? props.products.map((product, i) => {
              return (
                <Product
                  type={props.type}
                  product={product}
                  handleChange={props.handleChange}
                  key={i}
                />
              );
            })
          : ""}
        {props.type === "chosen"
          ? props.products.map((product, i) => {
              return (
                <Product
                  type={props.type}
                  product={product}
                  handleChange={props.handleChange}
                  key={i}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
