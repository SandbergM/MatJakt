import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



export default function Header(props) {

    const {
      className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
      <header>
        <div className="container2">
          <div className="logo">Matjakt.se</div>

          <div className="omOss">
            <Button className="omOss" color="#66C46C" onClick={toggle}>
              Om Oss
            </Button>
          
          </div>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Om MatJakt.se</ModalHeader>
            <ModalBody>
              Hej!
               Välkomna! Vi är en väldigt omtänktsam företag som vill hjälpa er att hitta bra mat med bra pris. 
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </Modal>
        </div>
      </header>
    );
  }

