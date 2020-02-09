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
import Component from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import Link from "next/Link";


const handler1 = (curr) =>{
  curr.setState({complexes: curr.state.tmp});
  curr.setState({tmp: <div></div>});
}

const seeMore = () =>{
  alert("Эта часть еще не готова, загляните позже ;)");
}

const handler = (complex, curr) =>{
  let newBody;
  fetch('http://192.168.43.201:8080/api/v1/userModules/getExercisesByComplexId/'+ complex).then(res => res.json()).then((result) =>{
    if(result.code == 200){
      console.log(result);
      curr.setState({tmp: curr.state.complexes});
      for(let i = 0; i < result.complexInfo.length; i++){
        newBody = <Container>
        <div className="mt-2">
          <Button onClick={(e) => handler1(curr)} variant="primary">Назад</Button>
        </div>
        <div className= "mb-2 mt-2 p-4 border border-dark rounded-lg">
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
         curr.setState({complexes: <div>{newBody}</div>});
      }
    }else{
      alert("Что-то пошло не так!");
    }
  },(error)=>{
  });
}

export default class  BodyLogged extends React.Component{
  constructor(props){
    super(props);
    this.state={complexes:<div><MainJumbotron/><CardCollectionName collectionName="Комплексы упражнений"/></div>, tmp:<div></div>}
  }

  async componentDidMount(){
    let curr = this;
    await axios.get('http://192.168.43.201:8080/api/v1/userModules/getComplexes').then(function (response) {
    console.log(response);
    let bodyBag;
      if(response.data.code == 200){
        try{
          for(let i = 0; i < 9; i=i+3){
            bodyBag = <div>
              <Container className="mb-2">
                  <Row>
                      <div className="card-deck">
                          <AddCard className ="card" complexId={response.data.complexList[i]._id} curr={curr} titleText={response.data.complexList[i].name} descriptionText={response.data.complexList[i].description} ></AddCard>
                          <AddCard className ="card" complexId={response.data.complexList[i+1]._id} curr={curr} titleText={response.data.complexList[i+1].name} descriptionText={response.data.complexList[i+1].description} ></AddCard>
                          <AddCard className ="card" complexId={response.data.complexList[i+2]._id} curr={curr} titleText={response.data.complexList[i+2].name} descriptionText={response.data.complexList[i+2].description} ></AddCard>
                          <SeeMoreCard className ="card"></SeeMoreCard>
                      </div>
                  </Row>
              </Container>
            </div>
            curr.setState({complexes: <div>{curr.state.complexes}{bodyBag}</div>});
          }
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
        {this.state.complexes}
      </div>
    );
  }
}

function SeeMoreCard(){
    return(
        <Card className="text-center" style={{ width: '18rem' } }>
            <div className="my-auto">
                <Card.Body>
                <Card.Title>Посмотреть больше тренировок</Card.Title>
                <Button onClick={(e) => seeMore()} href="#App" variant="secondary">Перейти</Button>
          </Card.Body>
            </div>
        </Card>
    );
}

function CardCollectionName(props){
    return(
        <div className="bg-light mb-2">
            <Container>
                <Row>
                   <Col md={4}>
                        <h3>{props.collectionName}</h3>
                   </Col>
                </Row>
            </Container>
        </div>
    );
}

function AddCard(props){
    return(
        <Card style={{ width: '18rem' } }>
          <Card.Img variant="top" src={props.imageLink} />
          <Card.Body>
            <Card.Title>{props.titleText}</Card.Title>
            <Card.Text>
              {props.descriptionText}
            </Card.Text>
            <Button onClick={(e) => handler(props.complexId, props.curr)} variant="primary">Перейти</Button>
          </Card.Body>
        </Card>
    );

}

function MainJumbotron(props){
    return(
        <Jumbotron className="text-center mb-0">
            <Container>
              <h1>Приступим к тренировке!</h1>
                  <p className="lead text-muted">Постройте персональную программу тренировок прямо сейчас!</p>
                  <p><span className="lead text-muted">Просто перейдите во вкладку </span><span className=" lead text-info">"Моя программа"</span></p>
            </Container>
        </Jumbotron>
    );
}
