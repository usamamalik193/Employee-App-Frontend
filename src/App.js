import "./App.css";
import Layout from "./components/Layout";
//import { Form } from 'reactstrap';
import LoginForm from "./components/LoginForm";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";

//const loggedIn = window.localStorage.getItem("isLoggedIn");

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route exact path="/login" element={<LoginForm />} />
        
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[1000]} />}>
            <Route exact path="/empForm" element={<EmployeeForm />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1000,2000]} />}>
            <Route exact path="/empList" element={<EmployeeList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
