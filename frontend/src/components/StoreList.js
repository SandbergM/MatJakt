import React, { useContext } from "react";
import Store from "./Store";
import { StoreContext } from "../contexts/StoreContext";

export default function List() {
  const { stores } = useContext(StoreContext);

  return (
    <div className="col-12 storelist">
      {stores.map((store, i) => {
        return <Store className="store-list" key={i} store={store}/>;
      })}
    </div>
  );
}
