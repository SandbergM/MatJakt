import React, { useEffect, useState } from "react";
import { Button, Label } from "reactstrap";

export default function EcologicalToggleButton(props) {
    const [isEcological, setIsEcological] = useState(props.product.isEcological || false);

    useEffect(() => {
        props.handleChange({ ...props.product, [props.field]: isEcological });
    }, [isEcological])

    return (
        <div className="row">
            <Button className="col-7 custom-searchbar-button matjaktWhite-bg"
                onClick={() => { setIsEcological(!isEcological) }}>
                <span> {isEcological ? (<span className="matJaktLightGreen-text button-icon">  &#10003; </span>) : ("")} </span>
            </Button>
            {props.label ? <Label className=" col-4 searchbar-label matjatkkDarkGreen-text oblique">{props.label}</Label> : ""}
        </div>
    );
}