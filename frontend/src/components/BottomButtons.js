import React from "react";
import { Button, Col, Row, Container } from "reactstrap";

export default function BottomButtons() {
  return (
    <div>
      <Col lg="12" lg="4">
        <Button>SAVE</Button>
      </Col>
      <Col lg="12" lg="4">
        <Button>PRINT</Button>
      </Col>
    </div>
  );
}
