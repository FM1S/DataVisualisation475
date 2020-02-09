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
  fetch('http://192.168.43.201:8080/api/v1/userModules/deleteComplexById/'+ id).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      alert("Комплекс успешно удален!");
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

const changeHandler = (id) =>{
  let name = document.getElementById('complexName' + id).value;
  let difficult = document.getElementById('complexDifficult' + id).value;
  let description = document.getElementById('complexDescription' + id).value;
  let category = document.getElementById('complexCategory' + id).value;
  let sex = document.getElementById('complexSex' + id).value;
  let wFrom = document.getElementById('userWeightMin' + id).value;
  let wTo = document.getElementById('userWeightMax' + id).value;

  if((name == "")||(difficult == "")||(description == "")||(category == "")||(sex == "")||(wFrom == "")||(wTo == "")){
    alert("Не оставляйте пустых полей! Если не нужно менять одно из полей скопируйте текст старого поля в поле для замены!");
  }else {
    fetch('http://192.168.43.201:8080/api/v1/userModules/updateComplexById/',{method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({complexId: id, name: name, description: description, category: category, sex: sex, difficult: difficult, minWeight: wFrom, maxWeight: wTo})}).then(res => res.json()).then((result) =>{
      if(result.code == 200){
        alert("Изменения произведены успешно!")
      }else{alert("Что-то пошло не так!");}
    },(innerError)=>{
    });
  }
}

const showComplexes = (current) => {
  let difficult = document.getElementById('diffSelect').value;
  let category = document.getElementById('catSelect').value;
  let sex = document.getElementById('sexSelect').value;
  let wFrom = document.getElementById('WeightMin').value;
  let wTo = document.getElementById('WeightMax').value;

  let block = <div></div>;
  fetch('http://192.168.43.201:8080/api/v1/userModules/getComplexesByParams/',{method: 'POST', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({sex: sex, minWeight: wFrom, maxWeight: wTo, difficult: difficult, category: category})}).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      let cIds = []; let eIds = [];
      for(let i = 0; i < result.complexList.length - 1; i++){
        let innerBlock = <div></div>;
        for(let j = 0; j < result.complexList[i].exercises.length; j++){
          eIds.push(result.complexList[i].exercises[j]);
          fetch('http://192.168.43.201:8080/api/v1/userModules/getExerciseById/' + result.complexList[i].exercises[j]).then(res => res.json()).then((innerResult) =>{
            if(innerResult.code == 200){
              innerBlock =
                    <div className= "mb-2 mt-2 p-4 border border-dark rounded-lg">
                      {innerBlock}
                       <div>
                         <Form className="border-bottom border-dark">
                           <Form.Group controlId={"complexName"+innerResult.exercise._id}>
                             <Form.Label>{innerResult.exercise.name}</Form.Label>
                           </Form.Group>
                         </Form>
                         <Form className="border-bottom border-dark">
                           <Form.Group controlId={"complexDescription" + innerResult.exercise._id}>
                             <Form.Label>{innerResult.exercise.description}</Form.Label>
                           </Form.Group>
                         </Form>
                         <Form>
                           <Form.Group controlId={"complexAmount"+innerResult.exercise._id}>
                             <Form.Label>Повторите {innerResult.exercise.amount} раз</Form.Label>
                           </Form.Group>
                         </Form>
                       </div>
                    </div>
            }
          },(innerError)=>{
          });
        }
        cIds.push(result.complexList[i]._id);
        block =
          <div>
            {block}
            <Card className="mt-2">
              <Card.Header>{result.complexList[i].name}</Card.Header>
              <Card.Body>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущее название: " + result.complexList[i].name}</Card.Title>
                  <Form.Group controlId={"complexName" + result.complexList[i]._id}>
                    <Form.Label>Новое название:</Form.Label>
                    <Form.Control type="text" placeholder="Введите новое название комплекса"/>
                  </Form.Group>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущий пол: " + result.complexList[i].sex}</Card.Title>
                  <Form.Group controlId={"complexSex" + result.complexList[i]._id}>
                    <Form.Label>Новый пол</Form.Label>
                    <Form.Control as="select">
                      <option>Мужской</option>
                      <option>Женский</option>
                      <option>Общее</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущая сложность: " + result.complexList[i].difficult}</Card.Title>
                  <Form.Group controlId={"complexDifficult" + result.complexList[i]._id}>
                    <Form.Label>Новая сложность</Form.Label>
                    <Form.Control as="select">
                      <option>Легко</option>
                      <option>Средне</option>
                      <option>Сложно</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущая категория: " + result.complexList[i].category}</Card.Title>
                  <Form.Group controlId={"complexCategory" + result.complexList[i]._id}>
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
                      <Col><Card.Title>{"От: " + result.complexList[i].minWeight + " кг"}</Card.Title></Col>
                      <Col><Card.Title>{"До: " + result.complexList[i].maxWeight + " кг"}</Card.Title></Col>
                    </Row>
                    <Row className="pb-2 pt-2">
                      <Col><Card.Title>Новый вес:</Card.Title></Col>
                      <Col>
                        <Form.Label>Вес от (кг)</Form.Label>
                        <input placeholder="> 30 кг"  type="number" class="form-control" id={"userWeightMin" + result.complexList[i]._id} className="w-100" min="30" max="200" />
                      </Col>
                      <Col>
                        <Form.Label>Вес до (кг)</Form.Label>
                        <input placeholder="< 200 кг"  type="number" class="form-control" id={"userWeightMax" + result.complexList[i]._id} className="w-100" min="30" max="200" />
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="border-bottom border-dark">
                  <Card.Title>{"Текущее описание: " + result.complexList[i].description}</Card.Title>
                  <Form.Group controlId={"complexDescription" + result.complexList[i]._id}>
                    <Form.Label>Новое описание комплекса упражнений</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                </div>

                <div className="mt-2 text-center">
                  <Container>
                    <Row>
                      <Col><Button onClick={(e) => changeHandler(result.complexList[i]._id)} variant="primary">Изменить</Button></Col>
                      <Col><Button onClick={(e) => deleteHandler(result.complexList[i]._id)} variant="primary">Удалить</Button></Col>
                    </Row>
                  </Container>
                </div>
              </Card.Body>
            </Card>
          </div>
      }
      current.setState({complexIds: cIds, exersiceIds: eIds, complexesBlck: block});
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

export default class ChangeComplex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      complexIds: "", exersiceIds: "", complexesBlck:<div></div>
    }
  }

    render(){


      return(
        <Container>
          <div className= "mb-2 mt-2 p-4 border border-dark rounded-lg">
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="sexSelect">
                    <Form.Control as="select">
                      <option>Мужской</option>
                      <option>Женский</option>
                      <option>Общее</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="diffSelect">
                    <Form.Control as="select">
                      <option>Легко</option>
                      <option>Средне</option>
                      <option>Сложно</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="catSelect">
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
                        <input placeholder="> 30 кг"  type="number" class="form-control" id="WeightMin" className="w-100" min="30" max="200" />
                      </Col>
                      <Col lg={6}>
                        <Form.Label>Вес до (кг)</Form.Label>
                        <input placeholder="< 200 кг"  type="number" class="form-control" id="WeightMax" className="w-100" min="30" max="200" />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
              <Row><Button onClick={(e) => showComplexes(this)} className="btn-primary mx-auto mt-4">Показать комплексы</Button></Row>
            </Form>
          </div>
          {this.state.complexesBlck}
        </Container>
      );
  }
}
