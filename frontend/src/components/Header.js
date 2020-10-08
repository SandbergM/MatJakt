import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function Header(props) {
  const { className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <header>
      <div className="header-container">
        <div className="logo">Matjakt.se</div>

        <div className="omOss">
          <Button className="omOss" color="#66C46C" onClick={toggle}>
            Om Oss
          </Button>
        </div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Om MatJakt.se</ModalHeader>
          <ModalBody>
            Hej och välkomna till MatJakt.se! <br></br>
            <br></br>
            När du söker efter din produkt kan du välja att söka efter en
            enskild produkt, eller så kan du skapa en färdig inköpslista på en
            gång genom att klicka på det ljusgröna plus-tecknet. <br></br>
            <br></br>
            <b>Att söka efter enskilda produkter</b>
            <br></br>
            Om du söker efter en enskild produkt, så kommer vi att föreslå 5
            produkter från varje butik för dig att välja emellan. <br></br>
            <br></br> Klicka på plus-tecknet på produkten för att spara den in i
            din slutliga lista. Fortsätt tills du är nöjd!
            <br></br>
            <br></br>
            <b>Att söka efter en hel lista med produkter</b>
            <br></br>
            För dig som är lat: Du kan skapa en inköpslista genom att fylla i det du letar efter i searchbar:en och klicka på det ljusgröna plus-tecknet. Din podukt kommer att hamna i en separat lista under searchbar:en. <br></br>
            <br></br> När du är klar med din inköpslista klickar du på 'Hämta prisförslag', och så far du ett förslag från varje butik som hamnar direkt in i din slutliga produktlista. 
            <br></br>
            <br></br>
            <b>Lycka till!</b>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    </header>
  );
}
