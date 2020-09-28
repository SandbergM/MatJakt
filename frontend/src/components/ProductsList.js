import React from "react";
import Product from "../components/Product";

export default function ProductsList(props) {
  return (
    <div className="search-results">
      <div className="results">
        {props.products.map((product) => {
          return <Product product={product} />
        })}
      </div>
    </div>
  );
}