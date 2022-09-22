import React,{useState} from "react";
import {
  Button,
  Form,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import axios from "../../api/axios";
  

function RegisterForm() {

    // let config = {
    //     headers: {
    //       "Content-Type":
    //         "multipart/form-data boundary=---011000010111000001101001",
    //         enctype: "multipart/form-data",
    //       //"ngrok-skip-browser-warning": "true",
    //       //Authorization: `Bearer ${auth.accessToken}`,
    //     },
    //   };

    const [status,setStatus]=useState("")
    const [data, setData]= useState({
        fName:"",
        lName:"",
        city:"",
        password:"",
        role:""
    });

    let name, value;
    const handle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  
  const submit = async(e)=>{
    e.preventDefault();
    const response = await axios.post("/register", data, );
    if (response) setStatus(response.statusText);
    setData("");
    
    
  }

  
  
  return (
    <div>
      <div className="AppLogin">
        <h2>Registeration Form</h2>
        <Form className="form" id="empForm" onSubmit={submit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="fName">First Name</Label>
                <Input
                  id="fName"
                  name="fName"
                  placeholder="Enter your first name"
                  type="text"
                  value={data.fName}
                    onChange={handle}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Last Name</Label>
                <Input
                  id="lName"
                  name="lName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={data.lName}
                  onChange={handle}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="city">City</Label>
            <Input 
            id="city"
            name="city"
            placeholder="your city"
            value={data.city}
            onChange={handle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter new password"
              value={data.password}
              onChange={handle}
            />
          </FormGroup>

          <FormGroup>
            <Label for="role">Select Role</Label>
            <Input
              id="role"
             // multiple
              name="role"
              type="select"
              value={data.role}
              onChange={handle}
            >
              <option>select-role</option>
              <option>Admin</option>
              <option>Employee</option>
              <option>Editor</option>
              <option>User</option>
            </Input>
          </FormGroup>
          <FormGroup></FormGroup>
          <Button type="submit">Sign in</Button>
        </Form>
        {status && <h4>{status}</h4>}
      </div>
    </div>
  );
}

export default RegisterForm;