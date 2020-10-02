import React, { useState } from 'react';
import { Button } from 'reactstrap'
//import './App.css';

function Questionmark() {
  const [isShown, setIsShown] = useState(false);

  function changeBg(e) {
    //e.target.style.background = 'green';
  }
  return (
    <div >
      <Button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        ?
      </Button>
      {isShown && (
        <div className="info">
          Skriv här viken produkt vill du söka efter.
        </div>
      )}
    </div>
  );
}

export default Questionmark;
