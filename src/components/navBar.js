import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Button, NavbarBrand } from "reactstrap";
//import { sideBarData } from "./sideBarData";
import "./../Navbar.css";
import { IconContext } from "react-icons";
import useLogout from "../hooks/useLogout";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { auth } = useAuth();

  let config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [sidebarData, setsidebarData] = useState([]);

  useEffect(() => {
    axios.get("/navBarData", config).then((res) => {
      setsidebarData(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adminData = sidebarData.filter((title) => {
    return (
      title.title === "New Entry" ||
      title.title === "Employee List" ||
      title.title === "Products" ||
      title.title === "Home" ||
      title.title === "Roles"
    );
  });

  const empData = sidebarData.filter((title) => {
    return (
      title.title === "Home" ||
      title.title === "Employee List" ||
      title.title === "Products"
    );
  });

  const editData = sidebarData.filter((title) => {
    return (
      title.title === "Home" ||
      title.title === "Employee List" ||
      title.title === "Products"
    );
  });

  const userData = sidebarData.filter((title) => {
    return title.title === "Home" || title.title === "Products";
  });

  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />

            <NavbarBrand style={{ color: "white" }}>
              Employee Management System
            </NavbarBrand>
            <Button onClick={signOut} style={{ marginLeft: 1180 }}>
              Logout
            </Button>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {auth.roles.find((role) => role === 1000)
              ? adminData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : auth.roles.find((role) => role === 2000)
              ? empData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : auth.roles.find((role) => role === 3000)
              ? editData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : userData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}

            {/* {empData.map((item, index)=>{
              return(
                <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li> 
              );
            })} */}
            {/* {sideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
