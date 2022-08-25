import {Outlet, useNavigate, } from "react-router-dom"
//import { Navbar , NavbarBrand, Button, NavItem} from "reactstrap";
import Navbar from './navBar';


export const Layout = ()=>{



    // let navigate=useNavigate();

    // const logOut= (e)=>{
    //     e.preventDefault();
    //     window.localStorage.removeItem("isLoggedIn");
    //     nav();
        

    // }
    // const nav = () => {
    //     navigate("/login", { replace: true });
   
    //   };

   return(
       <main >
       <Navbar />
        <Outlet />
    </main>
   )

}
export default Layout