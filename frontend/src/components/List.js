import React from "react";
import SearchResults from "../components/SearchResults";
import ShoppingList from "../components/ShoppingList";

export default function List() {
  let storeNames = [
    { name: "Ica", color: "#E83F39" },
    { name: "Coop", color: "#66C46C" },
    { name: "Willy's", color: "#743EBB" },
  ];

  if (storeNames) {
    const lists = () => {
      return storeNames.map((storeName, i) => {
        return (
          <div className="store-list col-lg-4 col-12">
            <h4
              className="store-name"
              align="center"
              style={{ backgroundColor: `${storeName.color}` }}
            >
              {storeName.name}
            </h4>
            <div className="">
              <div>
                <SearchResults />
                <ShoppingList />
              </div>
            </div>
          </div>
        );
      });
    };
    return <>{lists()}</>;
  }
}
