import HeaderUnlogged from "./HeaderUnlogged";
import Footer from '../comps/Footer';

const LayoutUnlogged = props => (
  <div>
    <div className="sticky-top">
      <HeaderUnlogged />
    </div>
    {props.children}
    <Footer/>
  </div>
);

export default LayoutUnlogged;
