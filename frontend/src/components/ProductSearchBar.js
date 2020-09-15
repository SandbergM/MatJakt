import React from "react";

import { Input } from 'reactstrap';

export default function ProductSearchBar(props) {
  return (
    <div
      id="matjakt-searchbar-main"
      className="container-fluid row justify-content-center "
    >
      <div
        id="matjakt-searchbar-header"
        className="matjatkDarkGreen-bg col-lg-10"
        style={{ display: "flex" }}
      >
        <p
          id="searchbar-header-title"
          className="matjaktWhite-text align-self-center oblique"
        >
          Hitta produkter
        </p>
      </div>
      <div
        id="matjakt-searchbar-content-container"
        className="col-lg-10 d-flex justify-content-around">
        <div className="row container-fluid">
          <div className="col-xl-9 col-lg-6 col-md-12">
            <Input
              placeholder="Sök efter produkt..."
              className="matjaktWhite-bg matjakt-inputfield oblique"
            >
            </Input>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12 d-flex justify-content-between">
            <Input placeholder="Volym" className="matjakt-inputfield oblique" style={{ width: "48%" }}>  </Input>
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique" style={{ width: "48%" }}>
              <option value={"kg"}> Kilogram </option>
              <option value={"gr"}> Gram </option>
              <option value={"ml"}> Milliliter </option>
              <option value={"l"}> Liter </option>
            </Input>
          </div>
          <div className="col-xl-5 col-lg-5 col-md-12 d-flex justify-content-between">
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique" style={{ width: "48%" }}>
              <option selected disabled>Kategorier</option> {/* TODO, Categories should come as props */}
            </Input>
            <Input type="select" placeholder="Volym" className="matjakt-inputfield-select oblique" style={{ width: "48%" }}>
              <option selected disabled>Land</option> {/* TODO, countries should come as props */}
            </Input>
          </div>
        </div>

      </div>
    </div >
  );
}
