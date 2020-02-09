import BodyLogged from '../comps/BodyLogged';
import Footer from '../comps/Footer';
import LayoutLogged from '../comps/LayoutLogged';
import TopMenu from '../comps/TopMenu';
import Head from "next/head";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import axios from 'axios';
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

import {useLocation} from "react-router-dom";
import withRouter from "next/router";
import Component from "react";
import ChangeComplex from '../comps/ChangeComplex';
import ChangeEx from '../comps/ChangeEx';

import Link from 'next/link';

function Home(){
  return <div>
    <Head>
      <title>Спортакус</title>
      <link rel="shortcut icon" href="../pics/Logo-icon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
    </Head>
  </div>
}

function Breaker(props){
    return(
        <div className={props.bg + " mb-2"}>
            <Container>
                <Row>
                   <Col>
                        <h3>{props.collectionName}</h3>
                   </Col>
                </Row>
            </Container>
        </div>
    );
}

const handlerCheckbox = (curr) => {
  let numRadio = document.getElementById('numRadio');
  if (numRadio.value == "on") {
    //console.log(numRadio.value);
    numRadio.value = "off";
    curr.setState({nr: "on", tr: "off", disabler1:"", disabler2:"disabled"});
    //console.log(curr.state.disabler1);
  } else if(numRadio.value =="off") {
    //console.log(numRadio.value);
    numRadio.value = "on";
    curr.setState({nr: "off", tr: "on", disabler1:"disabled", disabler2:""});
    //console.log(curr.state.disabler1);
  }
}

const handler = (curr) => {
  let name = document.getElementById('exName').value;
  let difficult = document.getElementById('exDifficult').value;
  let description = document.getElementById('exDescription').value;
  let category = document.getElementById('exCategory').value;
  let sex = document.getElementById('exSex').value;
  let amount;
  if(curr.state.nr == "on")
    amount = document.getElementById('numOfRetr').value;
  else
    amount = document.getElementById('timeRetr').value;

  let bodyBag;
  let exesBlock;
  fetch('http://192.168.43.201:8080/api/v1/userModules/addExerciseToComplex/' , {method: 'POST', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({complexId: curr.state.complexID,
    name: name,
    description: description,
    difficult: difficult,
    category: category,
    sex: sex,
    amount: amount,})}).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      console.log(result);
      bodyBag = <Breaker bg="bg-light" collectionName={name}/>
      exesBlock = <div>{curr.state.exes}{bodyBag}</div>;
      curr.setState({exes: exesBlock});
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });

}

const handler1 = (curr) => {
  let name = document.getElementById('complexName').value;
  let difficult = document.getElementById('complexDifficult').value;
  let description = document.getElementById('complexDescription').value;
  let category = document.getElementById('complexCategory').value;
  let sex = document.getElementById('complexSex').value;
  let wFrom = document.getElementById('userWeightMin').value;
  let wTo = document.getElementById('userWeightMax').value;
  fetch('http://192.168.43.201:8080/api/v1/userModules/addComplex/',{method: 'POST', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name: name,
    description: description,
    category: category,
    sex: sex,
    difficult: difficult,
    minWeight: wFrom,
    maxWeight: wTo})}).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      console.log(result);
      curr.setState({complexID: result.id});
      alert("Комплекс добавлен, заполните его!");
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

export default class adminLogged extends React.Component {
  constructor(props){
    super(props);
    this.state = {nr: "off", tr: "off", disabler1: "disabled", disabler2: "", complexID: "",
      exes:<div className="text-center"><Breaker bg="bg-primary" collectionName="Упражения"/></div>};
  }

  render(){

    let login;
    if(process.browser){
      login = new URLSearchParams(window.location.search).get('query');
    }
    return(
      <div>
        <Home/>
        <LayoutLogged>
          <div>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row style={{position: '-webkit-sticky', position: 'sticky', top: '0', 'z-index': '1'}}>
              <div className="w-100">
                <ListGroup horizontal className="w-100">
                  <ListGroup.Item action href="#link1" className="w-100 text-center">
                    Добавление комплекса
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2" className="w-100 text-center">
                    Изменение комплексов
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3" className="w-100 text-center">
                    Изменение упражнений
                  </ListGroup.Item>
                </ListGroup>
              </div>
              </Row>
              <Row>
              <div className="w-100">
                <Tab.Content>
                  <Tab.Pane eventKey="#link1">
                    <Container>
                      <div className= "mb-2 mt-2 p-4 border border-dark rounded-lg">
                        <Form>
                          <Form.Group controlId="complexName">
                            <Form.Label>Название комплекса упражнений</Form.Label>
                            <Form.Control type="text" placeholder="Например, 'Утренняя зарядка' " />
                          </Form.Group>
                          <Form.Group controlId="complexSex">
                            <Form.Label>Пол</Form.Label>
                            <Form.Control as="select">
                              <option>Мужской</option>
                              <option>Женский</option>
                              <option>Общее</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="complexDifficult">
                            <Form.Label>Сложность</Form.Label>
                            <Form.Control as="select">
                              <option>Легко</option>
                              <option>Средне</option>
                              <option>Сложно</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="complexDescription">
                            <Form.Label>Описание комплекса упражнений</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                          </Form.Group>
                          <Form.Group controlId="complexCategory">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control as="select">
                              <option>Общее</option>
                              <option>Ноги</option>
                              <option>Пресс</option>
                              <option>Руки</option>
                              <option>Спина</option>
                              <option>Ягодицы</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="complexCategory">
                            <Container border border-dark rounded-lg>
                              <Row>
                                <Col>
                                  <Form.Label>Рост от (см)</Form.Label>
                                  <input placeholder="> 150 см" type="number" class="form-control" id="userHeightMin" className="w-100" min="150" max="200"/>
                                </Col>
                                <Col>
                                  <Form.Label>Рост до (см)</Form.Label>
                                  <input placeholder="< 200 см" type="number" class="form-control" id="userHeightMax" className="w-100" min="150" max="200"/>
                                </Col>
                                <Col>
                                  <Form.Label>Вес от (кг)</Form.Label>
                                  <input placeholder="> 30 кг"  type="number" class="form-control" id="userWeightMin" className="w-100" min="30" max="200" />
                                </Col>
                                <Col>
                                  <Form.Label>Вес до (кг)</Form.Label>
                                  <input placeholder="< 200 кг"  type="number" class="form-control" id="userWeightMax" className="w-100" min="30" max="200" />
                                </Col>
                              </Row>
                              <Row>
                                <Button onClick={(e) => handler1(this)} f1="" f2="" className="btn-primary mx-auto mt-4">Заполнить комплекс</Button>
                              </Row>
                            </Container>
                          </Form.Group>
                          <Row>
                            <Col id="complexExes">
                              {this.state.exes}
                            </Col>
                          </Row>
                        </Form>
                      </div>
                      <div className= "mb-3 p-4 border border-dark rounded-lg">
                      <Form>
                        <Form.Group controlId="exName">
                          <Form.Label>Название упражнения</Form.Label>
                          <Form.Control type="text" placeholder="Например, 'Утренняя зарядка' " />
                        </Form.Group>
                        <Form.Group controlId="exSex">
                          <Form.Label>Пол</Form.Label>
                          <Form.Control as="select">
                            <option>Мужской</option>
                            <option>Женский</option>
                            <option>Общее</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exDifficult">
                          <Form.Label>Сложность</Form.Label>
                          <Form.Control as="select">
                            <option>Легко</option>
                            <option>Средне</option>
                            <option>Сложно</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exDescription">
                          <Form.Label>Описание упражнения</Form.Label>
                          <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <Form.Group controlId="exCategory">
                          <Form.Label>Категория</Form.Label>
                          <Form.Control as="select">
                            <option>Общее</option>
                            <option>Ноги</option>
                            <option>Пресс</option>
                            <option>Руки</option>
                            <option>Спина</option>
                            <option>Ягодицы</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exType">
                          <Container border border-dark rounded-lg>
                            <Row>
                                <Col lg={1} className="my-auto text-center">
                                  <Form.Check id="numRadio" num-radio="#numRadio" time-radio="#timeRadio" name="formHorizontalRadios" inline  onChange={(e) => handlerCheckbox(this)} className="mt-2" type="radio"/>
                                </Col>
                                <Col lg={11}>
                                  <Form.Label  >Число повторений</Form.Label>
                                  <input disabled={this.state.disabler1} placeholder="Введите число повторений упражнения" type="number" class="form-control" id="numOfRetr" className="w-100" min="1" max="200"/>
                                </Col>
                                <Col lg={1} className="my-auto text-center">
                                  <Form.Check  id="timeRadio" time-radio="#timeRadio" num-radio="#numRadio" inline name="formHorizontalRadios" onChange={(e) => handlerCheckbox(this)} className="mt-2" type="radio"/>
                                </Col>
                                <Col lg={11}>
                                  <Form.Label >Время (сек)</Form.Label>
                                  <input disabled={this.state.disabler2} placeholder="Введите время выполнения упражнения" type="number" class="form-control" id="timeRetr" className="w-100" min="1"/>
                                </Col>
                            </Row>
                            <Row>
                              <Button onClick={(e) => handler(this)} f1="" f2="" className="btn-primary mx-auto mt-4">Добавить</Button>
                            </Row>
                          </Container>
                        </Form.Group>
                      </Form>
                      </div>
                    </Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link2">
                    <ChangeComplex/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link3">
                    <ChangeEx/>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Row>
          </Tab.Container>

          </div>
        </LayoutLogged>
      </div>
    );
  }
}
