import React from "react";
import Questionmark from "./Questionmark";


export default function SearchBarHeader() {

  return (
    <div id="matjakt-searchbar-header" className="matjaktDarkGreen-bg col-12">
      <p
        id="searchbar-header-title"
        className="matjaktWhite-text align-self-center"
      >
        Sök efter produkt
      </p>
      <Questionmark
        text={
          "Mer information kring hur den här hemsidan fungerar kan ni hitta genom att klicka på 'Om Oss'."
        }
      />
    </div>
  );
}
