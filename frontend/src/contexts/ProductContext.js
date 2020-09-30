import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();
export default function ProductContextProvider(props) {
    const [newProduct, setNewProduct] = useState({});
    const [editedProduct, setEditedProduct] = useState({});

    const clearProduct = () => {
        setNewProduct({
            name: null,
            quantity: null,
            quantityType: null,
            countryOfOrigin: null,
            isEcological: false,
        });
    };

    useEffect(() => {
        clearProduct()
    }, []);

    useEffect(() => {
        //console.log(newProduct);
    }, [newProduct]);

    const handleChangeNewProduct = (product, attribute, value) => {
        setNewProduct({ ...product, [attribute]: value });
    };

    const updateProductInList = (product, attribute, value) => {
        /* TODO */
    }

    const values = {
        newProduct,
        handleChangeNewProduct,
        clearProduct,
        editedProduct,
        setEditedProduct,
    };

    return (
        <ProductContext.Provider value={values}>
            {props.children}
        </ProductContext.Provider>
    );
}
