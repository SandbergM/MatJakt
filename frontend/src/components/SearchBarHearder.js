import React from "react";
import Questionmark from "./Questionmark";


export default function SearchBarHeader(props) {

  return (
    <div id="matjakt-searchbar-header" className="matjaktDarkGreen-bg col-12">
      <p
        id="searchbar-header-title"
        className="matjaktWhite-text align-self-center"
      >
        Sök efter produkt
        </p>
      <Questionmark text={"Skriv här vilken produkt vill du söka efter."} />
    </div>
  );
}