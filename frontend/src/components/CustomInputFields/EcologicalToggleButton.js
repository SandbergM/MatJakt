import React, { useEffect, useState } from "react";
import { Button, Label } from "reactstrap";

export default function EcologicalToggleButton(props) {
  const [isEcological, setIsEcological] = useState(
    props.product.isEcological || false
  );

  useEffect(() => {
    changesomething();
  }, [isEcological]);

  const changesomething = () => {
    props.handleChange({ ...props.product, [props.field]: isEcological });
  };

  return (
    <div className="row">
      <Button
        className="col-7 custom-searchbar-button matjaktWhite-bg eko-toggle"
        onClick={() => {
          setIsEcological(!isEcological);
        }}
      >
        <span>
          {isEcological ? (
            <span className="matJaktLightGreen-text">&#10003;</span>
          ) : (
            " "
          )}
        </span>
      </Button>
      {props.label ? (
        <Label className=" col-4 searchbar-label matjatkkDarkGreen-text oblique">
          {props.label}
        </Label>
      ) : (
        " "
      )}
    </div>
  );
}
