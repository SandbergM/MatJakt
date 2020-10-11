import React from "react";
import { Button, Col } from "reactstrap";

export default function BottomButtons() {
  function print() {
    window.print();
  }

  const ref = React.createRef();

  return (
    <div className="col-12" ref={ref}>
      <Col className="text-center">
        <Button className="b1 matjaktDarkGreen-bg bottombutton drop-shadow" onClick={print}>
          Skriv ut din inköpslista
        </Button>
      </Col>
    </div>
  );
}
