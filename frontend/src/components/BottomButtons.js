import React from "react";
import { Button, Col } from "reactstrap";
/* import ReactDOM from "react-dom";
import ReactToPdf from "react-to-pdf"; */

export default function BottomButtons() {
  function print() {
    window.print();
  }

  const ref = React.createRef();

  return (
    <div className="col-12" ref={ref}>
      <Col className="text-center">
        <Button className="b1 matjaktDarkGreen-bg bottombutton" onClick={print}>
          Print or Save as PDF
        </Button>
      </Col>
    </div>
  );
}
