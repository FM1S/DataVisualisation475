import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";

import UserData from "../comps/UserData";
import BodyMyProgram from "../comps/BodyMyProgram";
import BodyLogged from '../comps/BodyLogged';

export default function  TopMenu(props){
    return(
      <div>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row style={{position: '-webkit-sticky', position: 'sticky', top: '0', 'z-index': '1'}}>
          <div className="w-100">
            <ListGroup horizontal className="w-100">
              <ListGroup.Item action href="#link1" className="w-100 text-center">
                Главная
              </ListGroup.Item>
              <ListGroup.Item action href="#link2" className="w-100 text-center">
                Моя программа
              </ListGroup.Item>
              <ListGroup.Item action href="#link3" className="w-100 text-center">
                Мои данные
              </ListGroup.Item>
            </ListGroup>
          </div>
          </Row>
          <Row>
          <div className="w-100">
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <BodyLogged login={props.login}/>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <BodyMyProgram login={props.login}/>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <UserData login={props.login}/>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Row>
      </Tab.Container>
      </div>
    );
}
