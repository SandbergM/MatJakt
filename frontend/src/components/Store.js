import React, { useState } from "react";
import SearchResults from "../components/SearchResults";
import ShoppingList from "../components/ShoppingList";
import { Collapse, Card, CardBody } from 'reactstrap';

export default function Store(props) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className=" col-lg-4 col-12 mb-5">
            <h4
                onClick={() => { setIsOpen(!isOpen) }}
                className="store-name"
                align="center"
                style={{ backgroundColor: `${props.store.color}` }}>
                {props.store.name}
            </h4>
            <Collapse isOpen={isOpen}>
                <Card>
                    <SearchResults mb-3 products={props.products} />
                    <ShoppingList products={props.products} />
                </Card>
            </Collapse>
        </div>
    )
}





{/* <SearchResults products={props.products} />
<ShoppingList products={props.products} /> */}