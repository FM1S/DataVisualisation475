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



const HeaderEmpty = () =>{
  return(
        <Navbar bg="dark" expand="lg" sticky="top">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="#App">
                  <Link href="/index">
                    <h3 className = "text-light"><strong>Спортакус</strong></h3>
                  </Link>
                </Navbar.Brand>
            </Container>
        </Navbar>
  );
}

function ProfileDropdown(props){
  return(
    <Col lg={2} className="user-name mt-1 pl-0">
                       <DropdownButton variant="secondary" id="dropdown-basic-button" title="Пользователь">
                         <Dropdown.Item href="#/action-1">Моя программа</Dropdown.Item>
                         <Dropdown.Item href="#/action-2">Профиль</Dropdown.Item>
                         <Dropdown.Item href="#/action-3" onClick={props.onClick}>Выйти</Dropdown.Item>
                       </DropdownButton>
    </Col>
  );
}

export default HeaderEmpty;
