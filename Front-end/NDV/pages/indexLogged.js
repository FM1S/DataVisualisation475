import BodyLogged from '../comps/BodyLogged';
import Footer from '../comps/Footer';
import LayoutLogged from '../comps/LayoutLogged';
import TopMenu from '../comps/TopMenu';
import Head from "next/head";

import {useLocation} from "react-router-dom";
import withRouter from "next/router";
import Component from "react";

import Link from 'next/link';

function Home(){
  return <div>
    <Head>
      <title>Спортакус</title>
      <script type="text/javascript" src="//vk.com/js/api/openapi.js?122"></script>
      <link rel="shortcut icon" href="../pics/Logo-icon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
    </Head>
  </div>
}


export default function indexLogged() {
    let login;
    if(process.browser){
      login = new URLSearchParams(window.location.search).get('query');
    }
    return(
      <div>
        <Home/>
        <LayoutLogged>
          <TopMenu login={login}/>
        </LayoutLogged>
      </div>
    );
}
