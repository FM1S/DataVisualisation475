import LayoutEmpty from "../comps/LayoutEmpty";
import SignInBody from "../comps/SignInBody";
import Head from "next/head";

function Home(){
  return <div>
    <Head>
      <title>Вход</title>
      <link rel="shortcut icon" href="../pics/Logo-icon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
    </Head>
  </div>
}

export default function SignIn(){
    return(
      <div>
        <Home/>
        <LayoutEmpty>
          <SignInBody/>
        </LayoutEmpty>
      </div>
    );
}
