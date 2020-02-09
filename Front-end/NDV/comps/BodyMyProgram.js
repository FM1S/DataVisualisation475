import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

import axios from 'axios';
import Component from "react";

const handler = (login, curr) => {
 let sex = document.getElementById('userSex').value;
 let height = document.getElementById('userHeight').value;
 let weight = document.getElementById('userWeight').value;
 let intens = document.getElementById('userIntensivity').value;
 let category = document.getElementById('userCategory').value;

 if(height < 150 || height > 200){
   alert("Введите другой рост! В нашей базе есть тренировки только для роста от 150 до 200 см");
   return 0;
 }
 if(weight < 30 || weight > 200){
   alert("Введите другой вес! В нашей базе есть тренировки только для веса от 30 до 200 кг");
   return 0;
 }

 fetch('http://192.168.43.201:8080/api/v1/userModules/getUserComplex/'+ login +'/'+ sex + '/'+ weight +'/'+ intens + '/' + category).then(res => res.json()).then((result) =>{
   if(result.code == 200){
     console.log(result.complexInfo);
     let bodyBag;
     for(let i = 0; i < result.complexInfo.length; i++){
       bodyBag = <Container><div className= "mb-2 mt-2 p-4 border border-dark rounded-lg">
            <Form className="border-bottom border-dark">
              <Form.Group controlId={"complexName"+result.complexInfo[i].index}>
                <Form.Label>{result.complexInfo[i].name}</Form.Label>
              </Form.Group>
            </Form>
            <Form className="border-bottom border-dark">
              <Form.Group controlId="complexDescription">
                <Form.Label>{result.complexInfo[i].description}</Form.Label>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group controlId="complexAmount">
                <Form.Label>Повторите {result.complexInfo[i].amount} раз</Form.Label>
              </Form.Group>
            </Form>
        </div></Container>;
       curr.setState({compex: <div>{curr.state.compex}{bodyBag}</div>});
     }
     alert("Тренировка создана!");
     curr.setState({isExist: true});
   }else{
     alert("Что-то пошло не так!");
   }
 },(error)=>{
 });

}

const handlerWeight = (curr) => {curr.setState({weight: document.getElementById('userWeight').value})}
const handlerHeight = (curr) => {curr.setState({height: document.getElementById('userHeight').value})}
const handlerSex = (curr) => {curr.setState({sex: document.getElementById('userSex').value})}
const handlerIntens = (curr) => {curr.setState({intens: document.getElementById('userIntensivity').value})}

export default class BodyMyProgram extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
            block:"" ,
            complex: <div></div>,
            login: this.props.login,
            isExist: false,
            sex: "",
            height: "",
            weight : "",
            intens: ""
        };
  }

  componentDidUpdate() {
    if(this.state.isExist){this.state.block = <BodyProgramExisted />}else{this.state.block = <BodyProgramUnexisted login={this.props.login} sex={this.state.sex} height={this.state.height} weight={this.state.weight} intens={this.state.intens}/>}
  }


  async componentDidMount(){
    let currComp = this;
    await axios.get('http://192.168.43.201:8080/api/v1/userModules/getUserData/'+ this.props.login).then(function (response) {
    console.log(response);
      if(response.data.code == 200){
        try{
          currComp.setState({isExist: response.data.isComplexExist});
          currComp.setState({sex: response.data.sex});
          currComp.setState({height: response.data.height});
          currComp.setState({weight: response.data.curWeight});
          currComp.setState({intens: response.data.difficult});
      }catch(err){
        console.error(err);
        alert("Внутренняя ошибка! Вы мертвы!");}
      }else{
        alert("Внутренняя ошибка! Данные не загружены!");
      }

  }).catch(function (error) {
    // handle error
    console.log(error);
  }).finally(function () {
    // always executed
  });
}

  render(){

    //отправляем запрос на получение инфы о существовании программы
    if(this.state.isExist){this.state.block = <BodyProgramExisted body={this.state.compex} curr={this} />}else{this.state.block = <BodyProgramUnexisted login={this.props.login} sex={this.state.sex} height={this.state.height} weight={this.state.weight} intens={this.state.intens} curr={this}/>}

    return(
      <div>{this.state.block}</div>
    );
  }
}

function UserDataBreaker(props){
    return(
        <div className="bg-light mb-2">
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

function BodyProgramUnexisted(props){
  return(
    <div>
      <CreateProgJumbotron login={props.login}/>
      <UserDataBreaker collectionName="Ваши данные"/>
      <Container>
          <Row className="mb-2">
             <Col><h4>Пол</h4></Col>
             <Col></Col>
             <Col>
                <select value={props.sex} onChange={(e) => handlerSex(props.curr)} class="form-control" id="userSex">
                  <option>Мужской</option>
                  <option>Женский</option>
                </select>
             </Col>
          </Row>
          <Row className="mb-2">
             <Col><h4>Рост (см)</h4></Col>
             <Col></Col>
             <Col><input value={props.height} onChange={(e) => handlerHeight(props.curr)} placeholder="Введите рост" type="number" class="form-control" id="userHeight" className="w-100" min="150" max="200"/></Col>
          </Row>
          <Row className="mb-2">
             <Col><h4>Вес (кг)</h4></Col>
             <Col></Col>
             <Col><input value={props.weight} onChange={(e) => handlerWeight(props.curr)}  placeholder="Введите вес"  type="number" class="form-control" id="userWeight" className="w-100" min="30" max="200" /></Col>
          </Row>
          <Row className="mb-2">
             <Col><h4>Сложность тренировок</h4></Col>
             <Col></Col>
             <Col>
                <select value={props.intens} onChange={(e) => handlerIntens(props.curr)} class="form-control" id="userIntensivity">
                  <option>Легко</option>
                  <option>Средне</option>
                  <option>Сложно</option>
                </select>
             </Col>
             </Row>
             <Row className="mb-2">
                <Col><h4>Тип тренировки</h4></Col>
                <Col></Col>
                <Col>
                   <select class="form-control" id="userCategory">
                     <option>Общее</option>
                     <option>Ноги</option>
                     <option>Пресс</option>
                     <option>Руки</option>
                     <option>Спина</option>
                     <option>Ягодицы</option>
                   </select>
                </Col>
          </Row>
          <Row className="" style={{marginBottom: '8.75vh', marginTop: '8.75vh'}}>
            <Button onClick={(e) => handler(props.login, props.curr)} heightInput="#userHeight" weightInput="#userWeight" intensivity="#userIntensivity" sex="#userSex" category="#userCategory" className="btn-primary mx-auto">Построить программу тренировок</Button>
          </Row>
      </Container>
    </div>
  );
}

function CreateProgJumbotron(props){
  return(
    <div>
      <Jumbotron  className="text-center mb-0">
          <Container>
                <h1>Привет, {props.login}!</h1>
                <p className="lead text-muted">Получи свою персональную тернировку, заполнив поля <span className=" lead text-info">ниже...</span></p>
          </Container>
      </Jumbotron>
    </div>
  );
}

function BodyProgramExisted(props){
  return(
    <div>
      <UserDataBreaker collectionName="Ваш комплекс" />
      {props.body}
    </div>
  );
}
