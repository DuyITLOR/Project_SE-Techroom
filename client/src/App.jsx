import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashBoard from "./pages/admin/AdminDashBoard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element={<Login />} />
        <Route path ="/admin/Dashboard"  element = {<ProtectedRoute roleRequired={["admin", "superadmin"]}>
          <AdminDashBoard/>
        </ProtectedRoute>}/>


        <Route path ="/student/Dashboard" element = {<ProtectedRoute roleRequired ="student">
          <StudentDashboard/>
        </ProtectedRoute>}/>

        <Route path ="/teacher/Dashboard" element = {<ProtectedRoute roleRequired ="student">
          <TeacherDashboard/>
        </ProtectedRoute>}/>


      </Routes>
    </div>
  );
};

export default App;
