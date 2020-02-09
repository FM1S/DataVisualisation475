import HeaderEmpty from "./HeaderEmpty";
import Footer from '../comps/Footer';
import Head from "next/head";

const LayoutEmpty = props => (
  <div>
    <HeaderEmpty />
    {props.children}
    <Footer sticktion="fixed-bottom"/>
  </div>
);

export default LayoutEmpty;
