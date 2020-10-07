import React from "react";
import Product from "../components/Product";

export default function ProductsList(props) {

  return (
    <div className="search-results">
      <div className="results">
        {props.products.map((product, i) => {
          return (
            <Product
              product={product}
              handleChange={props.handleChange}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
