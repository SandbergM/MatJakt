import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

export default function ProductSearchBar(props) {
    return (
        <Input
            placeholder={props.placeholder}
            className="col-12 matjaktWhite-bg matjakt-inputfield oblique matjakt-clearable"
            onChange={(e) => { props.handleChange(props.product, props.field, e.target.value) }} />
    );
}