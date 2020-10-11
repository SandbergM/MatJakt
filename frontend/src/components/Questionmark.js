import React, { useState } from 'react';
import { Button } from 'reactstrap'

function Questionmark(props) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="questionmark">
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        ?
      </div>
      {isShown && (
        <div className="info">
          {props.text}
        </div>
      )}
    </div>
  );
}

export default Questionmark;
