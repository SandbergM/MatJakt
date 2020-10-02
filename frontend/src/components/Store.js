import React, { useContext, useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { Collapse, Card } from 'reactstrap';
import { ShoppingListContext } from '../contexts/ShoppingListContext';

export default function Store(props) {

    const { singleProductSearchResult } = useContext(ShoppingListContext);

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
                    <ProductsList mb-3 products={singleProductSearchResult[props.store._id] ? singleProductSearchResult[props.store._id] : []} />
                    <ProductsList products={[]} />
                </Card>
            </Collapse>
        </div>
    )
}