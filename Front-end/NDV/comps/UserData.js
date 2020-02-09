import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Form from "react-bootstrap/Form";

import { withRouter } from 'next/router';

import Router from "next/router";
import Link from 'next/link';
import Component from "react";

const handler1 = (login) => {
  let sex = document.getElementById('userSex1').value;
  let height = document.getElementById('userHeight1').value;
  let weight = document.getElementById('userWeight1').value;
  let intens = document.getElementById('userIntensivity1').value;

  if(height < 150 || height > 200){
    alert("Введите другой рост! В нашей базе есть тренировки только для роста от 150 до 200 см");
    return 0;
  }
  if(weight < 30 || weight > 200){
    alert("Введите другой вес! В нашей базе есть тренировки только для веса от 30 до 200 кг");
    return 0;
  }

  fetch('http://192.168.43.201:8080/api/v1/userModules/setUserData/'+ login +'/'+ sex +'/'+ height +'/'+ weight +'/'+ intens).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      alert("Данные обновлены!");
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });

}

const handler2 = (login, curr) =>{
  curr.setState({statisticBlock: <UserDataBreaker collectionName="Статистика"/>});
  let block;
  fetch('http://192.168.43.201:8080/api/v1/userModules/getWeightChanging/'+ login).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      console.log(result);
      for(let i = 0; i < result.weight.length; i++){
        block = <div>
                          <Container>
                            <Row className="border-bottom border-top border-dark text-center">
                                <Col>
                                  <h3>{result.date[i].split("T")[0]}</h3>
                                </Col>
                                <Col>
                                  <h3>{result.weight[i] + " кг"}</h3>
                                </Col>
                            </Row>
                          </Container>
                  </div>
                curr.setState({statisticBlock: <div className="w-100">{curr.state.statisticBlock}{block}</div>});
      }
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

const handlerWeight = (curr) => {curr.setState({weight: document.getElementById('userWeight1').value})}
const handlerHeight = (curr) => {curr.setState({height: document.getElementById('userHeight1').value})}
const handlerSex = (curr) => {curr.setState({sex: document.getElementById('userSex1').value})}
const handlerIntens = (curr) => {curr.setState({intens: document.getElementById('userIntensivity1').value})}

export default class UserData extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
            sex: "",
            height: "",
            weight : "",
            intens: "",
            statisticBlock:<div></div>,
            vk:<div></div>
        };
  }

  async componentDidMount(){
    //this.setState({vk: VK.Share.button('http://mysite.com', {type: 'link'}) });
    let currComp = this;
    await axios.get('http://192.168.43.201:8080/api/v1/userModules/getUserData/'+ this.props.login).then(function (response) {
    console.log(response);
      if(response.data.code == 200){
        try{
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

  return(
    <div>
      <GreetingJumbotron userName={this.props.login}/>
      <UserDataBreaker collectionName="Ваши данные"/>
      <Container>
          <Row className="mb-2">
             <Col><h4>Пол</h4></Col>
             <Col></Col>
             <Col>
                <select value={this.state.sex} onChange={(e) => handlerSex(this)} class="form-control" id="userSex1">
                  <option>Мужской</option>
                  <option>Женский</option>
                </select>
             </Col>
          </Row>
          <Row className="mb-2">
             <Col><h4>Рост (см)</h4></Col>
             <Col></Col>
             <Col><input value={this.state.height}  onChange={(e) => handlerHeight(this)} placeholder="Введите рост" type="number" class="form-control" id="userHeight1" className="w-100" min="150" max="200"/></Col>
          </Row>
          <Row className="mb-2">
             <Col><h4>Вес (кг)</h4></Col>
             <Col></Col>
             <Col><input value={this.state.weight} onChange={(e) => handlerWeight(this)}  placeholder="Введите вес"  type="number" class="form-control" id="userWeight1" className="w-100" min="30" max="200" /></Col>
          </Row>
          <Row className="mb-2">
             <Col><h4>Сложность тренировок</h4></Col>
             <Col></Col>
             <Col>
                <select value={this.state.intens} onChange={(e) => handlerIntens(this)} class="form-control" id="userIntensivity1">
                  <option>Легко</option>
                  <option>Средне</option>
                  <option>Сложно</option>
                </select>
             </Col>
          </Row>
          <Row className="" style={{marginBottom: '8.75vh', marginTop: '8.75vh'}}>
              <Col>
                <Button onClick={(e) => handler1(this.props.login)} heightInput="#userHeight1" weightInput="#userWeight1" intensivity="#userIntensivity1" sex="#userSex1" className="btn-primary mx-auto">Сохранить</Button>
              </Col>
              <Col>
                <Button onClick={(e) => handler2(this.props.login, this)} className="btn-primary mx-auto">Показать статистику</Button>
              </Col>
              <Col>
                <Button href="https://vk.com/share.php?url=http://ex-sportacus.ru" className="btn-primary mx-auto">Репост VK</Button>
              </Col>
          </Row>
          <Row>
            {this.state.statisticBlock}
          </Row>
      </Container>
    </div>
  );
}
}

function GreetingJumbotron(props){
  return(
    <div>
      <Jumbotron className="text-center mb-0">
          <Container>
                <h1>Привет, {props.userName}!</h1>
                <p className="lead text-muted">Хотите изменить данные?</p>
                <p><span className="lead text-muted">Воспользуйтесь полями </span><span className=" lead text-info">ниже...</span></p>
          </Container>
      </Jumbotron>
    </div>
  );
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
