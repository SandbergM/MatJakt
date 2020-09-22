import React, { useContext } from "react";
import SearchResults from "../components/SearchResults";
import ShoppingList from "../components/ShoppingList";
import { StoreContext } from "../contexts/StoreContext";

export default function List() {

  const { stores } = useContext(StoreContext);

/*   let storeNames = [
    { name: "Ica", color: "#E83F39" },
    { name: "Coop", color: "#66C46C" },
    { name: "Willy's", color: "#743EBB" },
  ]; */

  if (stores) {
    console.log(stores);
    const lists = () => {
      return stores.map((store, i) => {
        return (
          <div className="store-list col-lg-4 col-12" key={i}>
            <h4
              className="store-name"
              align="center"
           /*    style={{ backgroundColor: `${storeName.color}` }} */
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
