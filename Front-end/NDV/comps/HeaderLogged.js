import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Link from 'next/link';



const HeaderLogged = () =>{
  return(
    <div>
        <Navbar bg="dark" expand="lg">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="#App">
                  <Link href="/indexLogged">
                    <h3 className = "text-light"><strong>Спортакус</strong></h3>
                  </Link>
                </Navbar.Brand>
                <Col lg={2} className="user-name pl-0">
                                   <DropdownButton className="mt-1 pl-0" variant="secondary" id="dropdown-basic-button" title="Пользователь">
                                     <Link href="/index">
                                      <Dropdown.Item href="#/action-3">Выйти</Dropdown.Item>
                                     </Link>
                                   </DropdownButton>
                </Col>
            </Container>
        </Navbar>
      </div>
    );
}

export default HeaderLogged;
