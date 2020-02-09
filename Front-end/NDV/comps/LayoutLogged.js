import HeaderLogged from "./HeaderLogged";
import Footer from '../comps/Footer';

const LayoutLogged = props => (
  <div>
    <div>
      <HeaderLogged />
    </div>
    {props.children}
    <Footer/>
  </div>
);

export default LayoutLogged;
