import React from "react";
import { Button, Col, Row, Container } from "reactstrap";
import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf";

export default function BottomButtons() {
  function print() {
    window.print();
  }

  const ref = React.createRef();

  return (
    <div className="row" ref={ref}>
      <Col className="text-center">
        
        <Button className="b1 ml-5" onClick={print}>
          PRINT/SAVE
        </Button>
      </Col>
    </div>
  );
}
