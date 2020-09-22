import React, { useContext } from "react";
import SearchResults from "../components/SearchResults";
import ShoppingList from "../components/ShoppingList";
import { StoreContext } from "../contexts/StoreContext";

export default function List() {
  const { stores } = useContext(StoreContext);
  const colors = ["#E83F39","#66C46C", "#743EBB"];

  /*   let storeNames = [
    { name: "Ica", color: "#E83F39" },
    { name: "Coop", color: "#66C46C" },
    { name: "Willy's", color: "#743EBB" },
  ]; */


  if (stores) {
    const lists = () => {
      return stores.map((store, i) => {
        return (
          <div className="store-list col-lg-4 col-12" key={i}>
            <h4
              className="store-name"
              align="center"
                 style={{ backgroundColor: `${colors[i]}` }}
            >
              {store.name}
            </h4>
            <div className="list-contents">
              <SearchResults />
              <ShoppingList />
            </div>
          </div>
        );
      });
    };
    return <>{lists()}</>;
  }
}
