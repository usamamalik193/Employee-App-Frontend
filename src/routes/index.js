import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Layout from '../components/Layout';
import EmployeeForm from '../components/Screens/EmployeeForm';
import EmployeeList from '../components/Screens/EmployeeList';
import Home from '../components/Screens/Home';
import ProductForm from '../components/Screens/ProductForm';
import LoginForm from '../components/Screens/LoginForm';
import RegisterForm from '../components/Screens/RegisterForm';
import RequireAuth from "../components/RequireAuth";
import PersistLogin from "../components/PersistLogin";
import RolesForm from '../components/Screens/RolesForm';
import ChatPage from '../components/Screens/ChatPage';

function index() {
  return (
    <Routes>
        <Route  path="/" element={<Layout />}>
         <Route  path="/" element={<Navigate to="/login" />} />
         <Route  path="/login" element={<LoginForm />} />
         <Route  path="/register" element={<RegisterForm />} />
         {/* <Route  path="/home" element={<Home />} /> */}
        
         <Route element={<PersistLogin/>}>
           <Route element={<RequireAuth allowedRoles={[1000]} />}>
             <Route  path="/empForm" element={<EmployeeForm />} />
             <Route  path="/roleForm" element={<RolesForm />} />
           </Route>
           
           <Route element={<RequireAuth allowedRoles={[1000,2000]} />}>
             <Route  path="/empList" element={<EmployeeList />} />
           </Route>
           <Route element={<RequireAuth allowedRoles={[1000,2000,3000,4000]} />}>
             <Route  path="/products" element={<ProductForm />} />
           </Route>
           <Route element={<RequireAuth allowedRoles={[1000,2000,3000,4000]} />}>
             <Route  path="/home" element={<Home />} />
             <Route  path="/chat" element={<ChatPage />} />
           </Route>
         </Route>
       </Route>
    </Routes>
  )
}

export default index