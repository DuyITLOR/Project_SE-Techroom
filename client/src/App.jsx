import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashBoard from "./pages/admin/AdminDashBoard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element={<Login />} />
        {/* <Route path ="/admin/Dashboard"  element = {<ProtectedRoute roleRequired = "admin">
          <AdminDashBoard/>
        </ProtectedRoute>}/> */}
        <Route path ="/admin/Dashboard"  element = {<AdminDashBoard/>}/>
        <Route path ="/student/Dashboard" element = {<ProtectedRoute roleRequired ="student">
          <StudentDashboard/>
        </ProtectedRoute>}/>
      </Routes>
    </div>
  );
};

export default App;
