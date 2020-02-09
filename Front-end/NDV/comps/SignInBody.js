import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from 'next/router';
import IndexLogged from "../pages/indexLogged";
import AdminLogged from "../pages/adminLogged";
import Form from "react-bootstrap/Form";

import Router from "next/router";
import Link from 'next/link';
import Component from "react";

export default class SignInBody extends React.Component{
  constructor(props){
    super(props);
    this.state ={cbVal: "off"}
  }
  render(){
  const handler = (e) => {
    var login = document.getElementById('inputLogin').value;
    let password = document.getElementById('inputPassword').value;
    if(this.state.cbVal == "off"){
      fetch('http://192.168.43.201:8080/api/v1/userModules/signIn/'+ login +'/'+ password).then(res => res.json()).then((result) =>{
      if(result.code == 200){
        Router.push({
          pathname: '/indexLogged',
          search: '?query='+login,
          state: { userLogin: login }
        })
      }else{
        alert("Неправильный логин или пароль!");
      }
    },(error)=>{
    });
  }else{
    fetch('http://192.168.43.201:8080/api/v1/userModules/signInAdmin/'+ login +'/'+ password).then(res => res.json()).then((result) =>{
      if(result.code == 200){
        Router.push({
          pathname: '/adminLogged',
          search: '?query='+login,
          state: { userLogin: login }
        })
      }else{
        alert("Неправильный логин или пароль!");
      }
    },(error)=>{
    });
  }
}

  const handlerCheckbox = (e) => {
    let cb = document.getElementById('adminCheck');
    if (cb.value == "on") {
      cb.value = "off";
      this.setState({cbVal: "on"});
    } else if(cb.value =="off") {
      cb.value = "on";
      this.setState({cbVal: "off"});
    }
  }

  return(
    <Container style={{marginTop: 20 + 'vh', paddingBottom: 20 + 'vh'}}>
           <Row>
              <Col lg={4}></Col>
              <Col lg={4} className="text-center">
                  <form className = "form-signin">
                    <img src="https://sun9-55.userapi.com/c854328/v854328068/19a5e8/PCkxvsA5gZI.jpg" alt="Logo" className = "logo-picture mb-2" width="72" height="72"/>
                    <h3><strong>Вход</strong></h3>
                    <input type="login" id = "inputLogin" class = "form-control mb-2" placeholder="Логин" required autoFocus></input>
                    <input type="password" id = "inputPassword" class = "form-control mb-2" placeholder="Пароль" required autofocus></input>
                      <a login-input="#inputLogin" password-input="#inputPassword" onClick={(e) => handler(e)} class="btn btn-lg btn-primary btn-block" type="submit">Войти</a>
                      <Form.Check id="adminCheck" checker="#adminCheck" onChange={(e) => handlerCheckbox(e)} className="mt-2" type="checkbox" label="Я Админинстратор" />
                    <p className="mt-2">У вас ещё нет аккаунта?
                      <Link href="/signup">
                        <a> Зарегистрируйтесь...</a>
                      </Link>
                    </p>
                </form>
              </Col>
              <Col lg={4}></Col>

           </Row>
       </Container>
  );
}
}
