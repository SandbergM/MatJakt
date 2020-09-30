import React from "react";
import { Input } from "reactstrap";

export default function ProductSelect(props) {
    return (
        <Input
            className="col-12 justify-content-center matjakt-inputfield oblique small-inputfield"
            type="select"
            placeholder={props.placeholder}
            onChange={(e) => { props.handleChange(props.product, props.field, e.target.value) }} >
            <option defaultValue> {props.defaultOption}  </option>
            {props.options.map((x, index) => {
                return (<option key={index} value={x._id}> {x.value} </option>)
            })}
        </Input>
    );
}
