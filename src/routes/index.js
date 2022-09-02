import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Layout from '../components/Layout';
import EmployeeForm from '../components/Screens/EmployeeForm';
import EmployeeList from '../components/Screens/EmployeeList';
import LoginForm from '../components/Screens/LoginForm';
import ProductForm from '../components/Screens/ProductForm';
import RegisterForm from '../components/Screens/RegisterForm';
import RequireAuth from "../components/RequireAuth";
import PersistLogin from "../components/PersistLogin";

function index() {
  return (
    <Routes>
        <Route  path="/" element={<Layout />}>
         <Route  path="/login" element={<LoginForm />} />
         <Route  path="/register" element={<RegisterForm />} />
        
         <Route element={<PersistLogin/>}>
           <Route element={<RequireAuth allowedRoles={[1000]} />}>
             <Route  path="/empForm" element={<EmployeeForm />} />
           </Route>
           <Route element={<RequireAuth allowedRoles={[1000,2000]} />}>
             <Route  path="/empList" element={<EmployeeList />} />
           </Route>
           <Route element={<RequireAuth allowedRoles={[1000,2000,3000,4000]} />}>
             <Route  path="/products" element={<ProductForm />} />
           </Route>
         </Route>
       </Route>
    </Routes>
  )
}

export default index