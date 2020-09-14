import React from "react";
import { Input } from "reactstrap";

export default function ProductSearchBar(props) {
  return (
    <div
      id="matjakt-searchbar-main"
      className="container-fluid row justify-content-center"
    >
      <div
        id="matjakt-searchbar-header"
        className="matjatkDarkGreen-bg col-lg-10"
        style={{ display: "flex" }}
      >
        <p
          id="searchbar-header-title"
          className="matjaktWhite-text align-self-center"
        >
          Hitta produkter
        </p>
      </div>
      <div
        id="matjakt-searchbar-content-container"
        className="matjaktWhite-bg col-lg-10"
      >
        <Input
          placeholder="Sök efter produkt..."
          className="matjaktWhite-bg"
        ></Input>
        <Input placeholder="Antal" className="matjaktWhite-bg"></Input>
        <Input type="select">
          <option value={"kg"}>/kg</option>
          <option value={"kg"}>/kg</option>
        </Input>
      </div>
    </div>
  );
}
