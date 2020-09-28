import React, { useState } from "react";
import Product from "../components/Product";

export default function SearchResults() {
  
  const [name, setName] = useState("");
  console.log(name);
  
  return (
    
    <div className="shopping-list" >
     <p>Hej</p>
    </div>
  );
}

/*const Product = (props) => {
  return (
    // Using Props handleClick as callback function
    <div onClick={() => props.handleClick(props.rowData)}>
      <p> {props.rowData.company} </p>
      <p> {props.rowData.contact} </p>
      <p> {props.rowData.country} </p>
    </div>
  );
};*/
