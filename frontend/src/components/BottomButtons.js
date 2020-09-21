import React from "react";
import { Button, Col, Row, Container } from "reactstrap";

export default function BottomButtons() {
  return (
    <div className="row">
      <Col className="text-center">
        <Button className="b1 mr-5">SAVE TO DESKTOP</Button>
        <Button className="b1 ml-5">PRINT</Button>
      </Col>
    </div>
  );
}
