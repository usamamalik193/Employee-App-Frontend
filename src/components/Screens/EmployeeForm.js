import "./../../App.css";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from '../navBar';
import axios from "../../api/axios";
//import { useNavigate, useLocation } from "react-router-dom";
// import uploads from '../../../uploads';

import {
  Button,
  Form,
  Col,
  FormText,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

//var Buffer = require('buffer/').Buffer;


//console.log(`${process.env.PUBLIC_URL}`)

export const EmployeeForm = () => {
  

  const { auth } = useAuth();

  let config = {
    headers: {
      "Content-Type":
        "multipart/form-data boundary=---011000010111000001101001",
      //"ngrok-skip-browser-warning": "true",
      enctype: "multipart/form-data",
      Authorization: `Bearer ${auth.accessToken}`,
    },
  };

  const [data, setData] = useState({
    employeeName: "",
    employeeAddress: "",
    employeeStatus: "",
    gender: "",
    empPhone: "",
  });

  const [image, setImage] = useState("");

  const [status, setStatus] = useState("");

  let name, value;
  const handle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    
    const img = e.target.files[0];
    setImage(img);
  };

  const submit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "usImagePreset");
    const imgUrl = await axios.post(
      "http://api.cloudinary.com/v1_1/dz7glrdgh/image/upload",
      formData
    );
    Object.keys(data).forEach((x) => formData.append(x, data[x]));
    formData.append("picture", imgUrl.data.url);
    const response = await axios.post("/employee", formData, config);
    if (response) setStatus(response.statusText);
    // window.location.reload();
  };

  //Object.keys(jsonData).forEach(x=>formData.append(x,jsonData[x]))

  return (
    
    
      
    <div className="Page">
      <Navbar />
      <div className="App">
        <h2>Employee Entry</h2>
        <Form className="form" id="empForm" onSubmit={submit}>
          <FormGroup>
            <Label for="employeeName">Employee Name</Label>
            <Input
              type="text"
              name="employeeName"
              id="employeeName"
              value={data.employeeName}
              onChange={handle}
            />
          </FormGroup>

          <FormGroup>
            <Label for="employeeAdress">Address</Label>
            <Input
              type="text"
              name="employeeAddress"
              id="employeeAddress"
              value={data.employeeAddress}
              onChange={handle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="employeeStatus">Status</Label>
            <Input
              type="select"
              name="employeeStatus"
              id="employeeStatus"
              value={data.employeeStatus}
              onChange={handle}
            >
              <option> --Select Employee Status--</option>
              <option>Employed</option>
              <option>Unemployed</option>
            </Input>
          </FormGroup>

          <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-2">Gender</legend>
            <Col sm={12}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handle}
                  />{" "}
                  Male
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handle}
                  />{" "}
                  Female
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Label for="empPhone">Employee Number</Label>
            <Input
              type="text"
              name="empPhone"
              id="empPhone"
              value={data.empPhone}
              onChange={handle}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              type="file"
              name="picture"
              //value={data.employeeImage}
              onChange={handleFileChange}
            />
            <FormText color="muted">
              PNG, GIF and JPG files are all acceptable.
            </FormText>
          </FormGroup>

          <Button type="submit">Submit</Button>
          <div id="newItemId"></div>
          {/* <div id="spinner" class="spinner-border d-none" role="status">
          <span class="sr-only">Loading...</span>
          </div> */}
        </Form>
        {status && <h4>{status}</h4>}
      </div>
    </div>

  );
};

export default EmployeeForm;
