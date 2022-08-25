import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link,useNavigate } from "react-router-dom";
import { Button, NavbarBrand} from "reactstrap";
import { sideBarData } from "./sideBarData";
import "./../Navbar.css";
import { IconContext } from "react-icons";
import useLogout from "../hooks/useLogout";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  
  const navigate = useNavigate();
  const logout= useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
}

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            
            <NavbarBrand style={{color:"white"}} >Employee Management System</NavbarBrand>
            <Button onClick={signOut} style={{marginLeft:1000}}>Logout</Button>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {sideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
            
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
