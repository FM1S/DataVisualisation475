import axios from 'axios';
import Component from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";

const deleteHandler = (id) =>{
  fetch('http://192.168.43.201:8080/api/v1/userModules/deleteExerciseById/'+ id).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      alert("Упражнение успешно удалено!");
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

const changeHandler = (id) =>{
  let name = document.getElementById('exName' + id).value;
  let amount = document.getElementById('amount' + id).value;
  let description = document.getElementById('exDescription' + id).value;
  let category = document.getElementById('exCategory' + id).value;
  let sex = document.getElementById('exSex' + id).value;
  let wFrom = document.getElementById('userWeightMin' + id).value;
  let wTo = document.getElementById('userWeightMax' + id).value;

  if((name == "")||(amount == "")||(description == "")||(category == "")||(sex == "")||(wFrom == "")||(wTo == "")){
    alert("Не оставляйте пустых полей! Если не нужно менять одно из полей скопируйте текст старого поля в поле для замены!");
  }else {
    fetch('http://192.168.43.201:8080/api/v1/userModules/updateExerciseById/',{method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({exerciseId: id, name: name, description: description, category: category, sex: sex, amount: amount, minWeight: wFrom, maxWeight: wTo})}).then(res => res.json()).then((result) =>{
      if(result.code == 200){
        alert("Изменения произведены успешно!")
      }else{alert("Что-то пошло не так!");}
    },(innerError)=>{
    });
  }
}

const showExercises = (current) =>{
  let category = document.getElementById('catSelect1').value;
  let sex = document.getElementById('sexSelect1').value;
  let wFrom = document.getElementById('WeightMin1').value;
  let wTo = document.getElementById('WeightMax1').value;

  let block = <div></div>;
  fetch('http://192.168.43.201:8080/api/v1/userModules/getExercisesByParams/',{method: 'POST', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    sex: sex, minWeight: wFrom, maxWeight: wTo, category: category
  })} ).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      console.log(result);
      for(let i = 0; i < result.exList.length; i++){
        block =
          <div>
            {block}
            <Card className="mt-2">
              <Card.Header>{result.exList[i].name}</Card.Header>
              <Card.Body>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущее название: " + result.exList[i].name}</Card.Title>
                  <Form.Group controlId={"exName" + result.exList[i]._id}>
                    <Form.Label>Новое название:</Form.Label>
                    <Form.Control type="text" placeholder="Введите новое название комплекса"/>
                  </Form.Group>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущий пол: " + result.exList[i].sex}</Card.Title>
                  <Form.Group controlId={"exSex" + result.exList[i]._id}>
                    <Form.Label>Новый пол</Form.Label>
                    <Form.Control as="select">
                      <option>Мужской</option>
                      <option>Женский</option>
                      <option>Общее</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущая категория: " + result.exList[i].category}</Card.Title>
                  <Form.Group controlId={"exCategory" + result.exList[i]._id}>
                    <Form.Label>Новая категория</Form.Label>
                    <Form.Control as="select">
                      <option>Общее</option>
                      <option>Ноги</option>
                      <option>Пресс</option>
                      <option>Руки</option>
                      <option>Спина</option>
                      <option>Ягодицы</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="border-bottom border-dark">
                  <Container>
                    <Row>
                      <Col><Card.Title>Текущий вес:</Card.Title></Col>
                      <Col><Card.Title>{"От: " + result.exList[i].minWeight + " кг"}</Card.Title></Col>
                      <Col><Card.Title>{"До: " + result.exList[i].maxWeight + " кг"}</Card.Title></Col>
                    </Row>
                    <Row className="pb-2 pt-2">
                      <Col><Card.Title>Новый вес:</Card.Title></Col>
                      <Col>
                        <Form.Label>Вес от (кг)</Form.Label>
                        <input placeholder="> 30 кг"  type="number" class="form-control" id={"userWeightMin" + result.exList[i]._id} className="w-100" min="30" max="200" />
                      </Col>
                      <Col>
                        <Form.Label>Вес до (кг)</Form.Label>
                        <input placeholder="< 200 кг"  type="number" class="form-control" id={"userWeightMax" + result.exList[i]._id} className="w-100" min="30" max="200" />
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="border-bottom border-dark">
                  <Container>
                    <Row>
                      <Col><Card.Title>Текущее число повторений:</Card.Title></Col>
                      <Col><Card.Title>{result.exList[i].amount + " раз"}</Card.Title></Col>
                    </Row>
                    <Row className="pb-2 pt-2">
                      <Col><Card.Title>Новое число повторений:</Card.Title></Col>
                      <Col>
                        <Form.Label>Число повторений</Form.Label>
                        <input placeholder="Минимум 1"  type="number" class="form-control" id={"amount" + result.exList[i]._id} className="w-100" min="1" max="200" />
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущее описание: " + result.exList[i].description}</Card.Title>
                  <Form.Group controlId={"exDescription" + result.exList[i]._id}>
                    <Form.Label>Новое описание упражнения</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                </div>

                <div className="mt-2 text-center">
                  <Container>
                    <Row>
                      <Col><Button onClick={(e) => changeHandler(result.exList[i]._id)} variant="primary">Изменить</Button></Col>
                      <Col><Button onClick={(e) => deleteHandler(result.exList[i]._id)} variant="primary">Удалить</Button></Col>
                    </Row>
                  </Container>
                </div>
              </Card.Body>
            </Card>
          </div>
      }
      current.setState({exBlck: block});
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

export default class ChangeEx extends React.Component{
  constructor(props){
    super(props);
    this.state = {exBlck:<div></div>}
  }

  render(){

    return(
      <div>
        <Container>
          <div className= "mb-2 mt-2 p-4 border border-dark rounded-lg">
            <Row>
              <Col>
                <Form.Group controlId="sexSelect1">
                  <Form.Control as="select">
                    <option>Мужской</option>
                    <option>Женский</option>
                    <option>Общее</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="catSelect1">
                  <Form.Control as="select">
                    <option>Общее</option>
                    <option>Ноги</option>
                    <option>Пресс</option>
                    <option>Руки</option>
                    <option>Спина</option>
                    <option>Ягодицы</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Form.Group>
                  <Row>
                    <Col lg={6}>
                      <Form.Label>Вес от (кг)</Form.Label>
                      <input placeholder="> 30 кг"  type="number" class="form-control" id="WeightMin1" className="w-100" min="30" max="200" />
                    </Col>
                    <Col lg={6}>
                      <Form.Label>Вес до (кг)</Form.Label>
                      <input placeholder="< 200 кг"  type="number" class="form-control" id="WeightMax1" className="w-100" min="30" max="200" />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Row><Button onClick={(e) => showExercises(this)} className="btn-primary mx-auto mt-4">Показать тренировки</Button></Row>
          </div>
          {this.state.exBlck}
        </Container>
      </div>
    );
  }
}
