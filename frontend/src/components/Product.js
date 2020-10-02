import React from "react";
import { useState } from "react";
import { MdDelete, MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { Button } from 'reactstrap';
import Shoppinglist from './ShoppingList'


export default function Product(props) {
  const [toadd, setToadd] = useState(['hej', 'hallå'])

  function add() {
    console.log('add to shoppinglist');
    
  }
  return (
    <div className="row product">
      <Shoppinglist toadd={toadd}/>
      <div
        className="col-3 product-image"
        style={{ backgroundImage: `url(${props.product.imageUrl})` }}
      >
        <div className="icons">
          <div className="add">
            <MdAddCircle className="white-icon" />
          </div>
          <div className="remove">
            <MdRemoveCircle className="white-icon" />
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="row align-items-start">
          <div className="col product-name">{props.product.name}</div>
        </div>
        <div className="row align-items-center mt-1">
          <div className="col comparison-price">
            <span className="product-brand">{props.product.brand} </span> |
            <span className="comparison-text"> Jfp: </span>
            {props.product.pricePerUnit} SEK / {props.product.comparisonUnit}
          </div>
        </div>
        <div className="row align-items-end">
          <div className="col product-price">
            {props.product.packagingSize} {props.product.quantityType} för{" "}
            <span className="price-text"> {props.product.price} SEK</span>
          </div>
        </div>
        <Button className="add-button" onClick={add}>
          Lägg till
        </Button>
        <div className="divider mt-3 mb-2"></div>
      </div>
      <div className="delete align-items-center right-icons">
        <div className="delete amount">{}</div>
        <MdDelete />
      </div>
    </div>
  );
}