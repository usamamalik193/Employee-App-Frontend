import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Row, Table } from "reactstrap";
import Navbar from "../navBar";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
//import _ from "lodash";



function RolesForm() {
  const { auth } = useAuth();
  const [status, setStatus] = useState("");
  const [userTable, setUserTable] = useState([]);
  const [cSelected, setCSelected] = useState([]);
  const [cData, setCData] = useState([]);
  const [singleData,setSingleData] =useState({
    'id':null,
    'roles':{}
  })
//     {
//     id:'',
//     roles:{
//       Admin:Number,
//       Employee:Number,
//       Editor:Number,
//       User:Number
//     }
//   }
// ]);

  let config = {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  const updateRoles=async()=>{
    const response= await axios.put("/users", singleData, config);
    if (response) setStatus(response.statusText);
    window.location.reload(false);
  };


  const onCheckboxBtnClick = (selected, objID) => {
    const index = cSelected.indexOf(selected);
    
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
    setRolesData(objID);
    //setCSelected([{ id:objID,roles:{selected}}]);
  };
  //console.log(cSelected);

  const setRolesData=async(objID)=>{
    var obj = cSelected.reduce(function (acc, cur) {
      if (cur === 1000) {
        acc['Admin'] = 1000;
      }
      if (cur === 2000) {
        acc['Employee'] = 2000;
      }
      if (cur === 3000) {
        acc['Editor'] = 3000;
      }
      if (cur === 4000) {
        acc['User'] = 4000;
      }
      return acc;
    }, {});

    setSingleData({id:objID,roles:obj})
    console.log(singleData);
    
  };
   
 
    
   
 
  
  useEffect( () => {
    
     axios.get("/users", config).then((res) => {
     setUserTable(res.data);
    //console.log(userTable);
      //console.log(res.data);
      // let newData=res.data.map((user)=>{
      //   let properties ={
      //     "id":user._id,
      //     "roles": user.roles, 
      //   };
      //   return properties;
      // });
      // setCData([...newData])
      //console.log(cData);
      //console.log('newData;',newData);
    });
    
    
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Page">
      <Navbar />
        <div className="App">
        <h4>List of Users</h4>
        <Table id="usersTable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Roles</th>
            </tr>
            </thead>
            <tbody>
            {userTable &&
              userTable.map((item) => {
                
                return (
                  <tr id={item.firstName} key={item._id} >
                    <td >{item.firstName}</td>
                    <td >{item.lastName}</td>
                    <td >{item.city}</td>
                    <td >
                      <ButtonGroup>
                        <Button
                          color="primary"
                          outline
                          onClick={() => onCheckboxBtnClick(1000, item._id)}
                          active={ item.roles.Admin ? true: false }
                        >
                          Admin
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => onCheckboxBtnClick(2000, item._id, Row.id)}
                          active={item.roles.Employee ? true: false}
                        >
                          Employee
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => onCheckboxBtnClick(3000, item._id, Row.id)}
                          active={ item.roles.Editor ? true: false}
                        >
                          Editor
                        </Button>
                        <Button
                          color="primary"
                          outline
                          onClick={() => onCheckboxBtnClick(4000, item._id, Row.id)}
                          active={item.roles.User ? true: false}
                        >
                          User
                        </Button>
                      </ButtonGroup>{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Button onClick={updateRoles}>Update</Button>
        <p> </p>
        <h6>1. Select roles for one user at a time and press Update</h6>
        {status && <h4>{status}</h4>}
      </div>
    </div>
  );
}

export default RolesForm;
