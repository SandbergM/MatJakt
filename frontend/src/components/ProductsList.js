import React from "react";
import Product from "../components/Product";

export default function ProductsList(props) {

 //console.log(props);
  

  return (
    <div className="search-results">
      <div className="results">
        {props.products.map((product) => {
          return <Product handleChange={props.handleChange} product={product} />
        })}
      </div>
    </div>
  );
}