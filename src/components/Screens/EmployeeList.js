import "./../../App.css";
import React , { useEffect, useState }from 'react';
import {Table} from 'reactstrap';
import useAuth from "../../hooks/useAuth";
import Navbar from '../navBar';
import axios from '../../api/axios'

function EmployeeList() {

  const {auth} = useAuth();

  let config = {
  
    headers: {
      "Authorization": `Bearer ${auth.accessToken}`
    },
  };

    const [tabData, setTabData] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        //let emp = [];
        
        axios.get("/employee", config).then((res) => {
          //console.log(res.data)
          //emp = res.data;
          setTabData(res.data );
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

  return (
    <div className="Page">
      <Navbar />
    <div className="App">
        <h4>List of employees</h4>
        <Table id="usersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Status</th>
              <th>Gender</th>
              <th>Phone No.</th>
              <th>Image</th>
            </tr>
            {tabData && tabData.map((item) => {
              
                return ( 
                  <tr>
                    <td key={item.id}>{item.body.employeeName}</td>
                    <td key={item.id}>{item.body.employeeAddress}</td>
                    <td key={item.id}>{item.body.employeeStatus}</td>
                    <td key={item.id}>{item.body.gender}</td>
                    <td key={item.id}>{item.body.empPhone}</td>
                    <td key={item.id}> <img  src={item?.body?.picture} width="50" height="50"alt={item?.file?.filename} /> </td>
                  </tr>
                );
              })}
          </thead>
          </Table>
        </div>
        </div>
  )
}

export default EmployeeList