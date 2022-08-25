import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { FormGroup, Form, Button, Input, Label } from "reactstrap";
import "./../App.css";

const axios = require("axios").default;

const api = axios.create({
  baseURL: "http://localhost:3000/auth",
});

export const LoginForm = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/empList";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/", JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
      //window.localStorage.setItem("isLoggedIn",true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      <div className="AppLogin">
        {/* <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go Employee Page</a>
                    </p>
                </section>
            ) : ( */}
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h2>Employee Login</h2>
          <Form inline onSubmit={handleSubmit}>
            <FormGroup floating>
              <Input
                type="text"
                id="username"
                placeholder="User Name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                
              />
              <Label for="userName">User Name</Label>
            </FormGroup>{" "}
            <FormGroup floating>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                autoComplete="on"
                
              />
              <Label for="examplePassword">Password</Label>
            </FormGroup>{" "}
            <Button>Submit</Button>
          </Form>
        </section>
        {/* )}
        </> */}
      </div>
    </div>
  );
};

export default LoginForm;