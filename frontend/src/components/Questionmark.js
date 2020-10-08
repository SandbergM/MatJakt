import React, { useState } from 'react';
import { Button } from 'reactstrap'

function Questionmark(props) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="questionmark">
      <Button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        ?
      </Button>
      {isShown && (
        <div className="info drop-shadow">
          {props.text}
        </div>
      )}
    </div>
  );
}

export default Questionmark;
