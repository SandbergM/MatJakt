import React, { useState } from "react";
import { Button } from "reactstrap";

export default function AddToListButton(props) {
    return (
        <div
              id="single-product-search-container"
              className="col-8 offset-2 col-sm-6 offset-sm-3 col-lg-4 col-lg-3 offset-lg-7 offset-xl-7 offset-xl-6 d-flex justify-content-center mt-4"
            >
              <Button
                id="single-product-search-button"
                className="matjaktDarkGreen-bg"
              >
                Sök efter produkt
              </Button>
            </div>
    );
}


