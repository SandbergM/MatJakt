import React from "react";
import { MdDelete, MdAddCircle, MdRemoveCircle } from "react-icons/md";

function Product() {
  //const { products } = useContext(ProductContext);
  let amountToBuy = 1;

  let products = [
    {
      name: "Kycklinglår Ica Basic",
      storeId: 1,
      brand: "Ica Basic",
      packagingSize: 800,
      pricePerUnit: 101.45,
      comparisonUnit: "kg",
      quantityType: "gr",
      price: 91.45,
      imageUrl:
        "https://assets.icanet.se/t_product_large_v1,f_auto/7318690176138.jpg",
    },
    {
      name: "Tonfisk i Olja",
      storeId: 1,
      brand: "Ica Basic",
      packagingSize: 185,
      pricePerUnit: 9.45,
      comparisonUnit: "kg",
      quantityType: "gr",
      price: 45.82,
      imageUrl:
        "https://assets.icanet.se/t_product_large_v1,f_auto/7310751164023.jpg",
    },
  ];

  if (products) {
    const list = () => {
      return products.map((product, i) => {
        return (
          <div>
            <div className="icons">
              <div className="add">
                <MdAddCircle />
              </div>
              <div className="remove">
                <MdRemoveCircle />
              </div>
              <div className="delete">
                <MdDelete />
              </div>
            </div>

            <div className="row product">
              <div
                class="col-3 product-image"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              ></div>

              <div class="col-7">
                <div class="row align-items-start">
                  <div class="col product-name">{product.name}</div>
                </div>
                <div class="row align-items-center ">
                  <div class="col product-price">
                    <span className="product-brand">{product.brand}</span> |{" "}
                    {amountToBuy} package | {product.packagingSize}{" "}
                    {product.quantityType} for{" "}
                    <span className="price-text"> {product.price} SEK</span>
                  </div>
                </div>
                <div class="row align-items-end">
                  <div class="col comparison-price">
                    <span className="comparison-text">Jfp: </span>
                    {product.pricePerUnit} SEK per {product.comparisonUnit}
                  </div>
                </div>
                <div className="divider"></div>
              </div>
            </div>
          </div>
        );
      });
    };

    return <>{list()}</>;
  }

  return (
    <div>
      <h3 className="golden m-2"> No products </h3>
    </div>
  );
}

export default Product;
