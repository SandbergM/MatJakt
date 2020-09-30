import React from "react";
import { Button } from "reactstrap";

export default function AddToListButton(props) {
    return (
        <Button className="col-12 custom-searchbar-button matJaktLightGreen-bg matjaktWhite-text"
            onClick={() => { props.addProductToShoppingList(props.product).then(props.clearProduct).then(document.getElementById('products-search-form').reset()) }}>
            <span className="button-icon ">&#x2b;</span>
        </Button>
    );
}