import React from "react";
import { Input } from "reactstrap";

export default function ProductInputField(props) {
    return (
        <Input
            placeholder={props.placeholder}
            value={props.value}
            className="col-12 matjaktWhite-bg matjakt-inputfield oblique"
            onChange={(e) => { props.handleChange({ ...props.product, [props.field]: e.target.value }) }} />
    );
}