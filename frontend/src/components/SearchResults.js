import React from "react";
import Product from "../components/Product";

export default function SearchResults(props) {
  return (
    <div className="search-results">
      <div className="results">
        {props.products ?
          props.products.map((product) => {
            console.log(product);
            return <Product product={product} />
          }) : ""
        }
      </div>
    </div>
  );
}
