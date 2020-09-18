import React from "react";
import { Button, Col, Row, Container } from "reactstrap";

export default function BottomButtons() {
  return (
    <div className="row justify-content-center mb-3">
      {/* <Col lg="12" lg="4">
        <Button>SAVE</Button>
      </Col>
      <Col lg="12" lg="4">
        <Button>PRINT</Button>
      </Col> */}
      <Col lg="2">
        <Button className="b1">SAVE TO DESKTOP</Button>
      </Col>
      <Col lg="4"></Col>
      <Col xs lg="2">
        <Button className="b1">PRINT</Button>
      </Col>
    </div>
  );
}
