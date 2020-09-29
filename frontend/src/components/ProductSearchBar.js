import React, { useContext } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import { ProductContext } from "../contexts/ProductContext";
import { CategoryContext } from "../contexts/CategoryContext";

import ProductInputField from './CustomInputFields/ProductInputField.js';
import ProductSelect from './CustomInputFields/ProductSelect.js';
import SearchBarHeader from './SearchBarHearder.js'
import EcologicalToggleButton from './CustomInputFields/EcologicalToggleButton.js'
import AddToListButton from './AddToListButton.js'
import SearchButton from './SearchButton.js'

export default function ProductSearchBar(props) {

  const { newProduct, handleChangeNewProduct, clearProduct } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { addProductToShoppingList } = useContext(ShoppingListContext);

  const temporaryCountriesOfOrigin = [{ _id: 'Sverige', value: 'Sverige' }, { _id: 'Annat', value: 'Annat' }]
  const temporaryMeasurements = [{ _id: 'st', value: 'Styck' }, { _id: 'kg', value: 'Kilogram' }, { _id: 'l', value: 'Liter' }, { _id: 'Sverige', value: 'Sverige' }]

  return (
    <div className="col-12 justify-content-center">
      <SearchBarHeader />
      <div id="matjakt-searchbar-content-container" className="d-flex justify-content-around mb-4">
        <form id="products-search-form">
          <div className="row">
            <div className="col-12 col-md-12 col-xl-8 d-flex mb-2">
              <ProductInputField
                field={"name"}
                placeholder={'Sök efter produkt...'}
                type={'text'}
                product={newProduct}
                handleChange={handleChangeNewProduct}
              />
            </div>
            <div className="col-12 col-md-12 col-xl-2 d-flex mb-2">
              <ProductInputField
                field={"quantity"}
                placeholder={'Volym'}
                type={'number'}
                options={categories}
                product={newProduct}
                handleChange={handleChangeNewProduct}
              />
            </div>
            <div className="col-12 col-md-12 col-xl-2 d-flex mb-2">
              <ProductSelect
                field={"quantityType"}
                placeholder={'Typ'}
                options={temporaryMeasurements}
                product={newProduct}
                handleChange={handleChangeNewProduct}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3 d-flex mb-2">
              <ProductSelect
                field={"categoryId"}
                defaultOption={'Kategorier'}
                options={categories}
                product={newProduct}
                handleChange={handleChangeNewProduct}
              />
            </div>
            <div className="col-12 col-md-6 col-xl-3 d-flex mb-2">
              <ProductSelect
                field={"countryOfOrigin"}
                defaultOption={'Välj ursprungsland'}
                options={temporaryCountriesOfOrigin}
                product={newProduct}
                handleChange={handleChangeNewProduct}
              />
            </div>
            <div className="col-9 col-md-10 col-xl-5 d-flex mb-2">
              <EcologicalToggleButton
                field={"isEcological"}
                label={"Ekologisk"}
                product={newProduct}
                handleChange={handleChangeNewProduct}
              />
            </div>
             <SearchButton/>
            <div className="col-3 col-md-2 col-xl-1 d-flex mb-2">
              <AddToListButton
                product={newProduct}
                clearProduct={clearProduct}
                addProductToShoppingList={addProductToShoppingList}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}