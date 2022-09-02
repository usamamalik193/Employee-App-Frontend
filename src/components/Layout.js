import {Outlet, } from "react-router-dom"
//import { Navbar , NavbarBrand, Button, NavItem} from "reactstrap";
import Navbar from './navBar';


export const Layout = ()=>{

   return(
       <main >
        <Outlet />
    </main>
   )

}
export default Layout