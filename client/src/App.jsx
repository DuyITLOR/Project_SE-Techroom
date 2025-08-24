import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashBoard from "./pages/admin/AdminDashBoard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import TeacherDashboard from "./pages/teacher/TeacherDashboard.jsx";
import ManageStudent from "./pages/admin/ManageStudent.jsx";
import ManageTeacher from "./pages/admin/ManageTeacher.jsx";
import ManageCourse from "./pages/admin/ManageCourse.jsx";
import ManageRoom from "./pages/admin/ManageRoom.jsx";
import ManageClass from "./pages/admin/ManageClass.jsx";
import ManageTimetable from "./pages/admin/ManageTimetable.jsx";
import StudentTimetable from "./pages/student/StudentTimetable.jsx";
import StudentRoadMap from "./pages/student/StudentRoadMap.jsx";
import StudentClassDashboard from "./pages/student/StudentClassDashboard.jsx";
import StudentClassFeedBack from "./pages/student/StudentClassFeedBack.jsx";
import TeacherTimetable from "./pages/teacher/TeacherTimetable.jsx";
import TeacherClassDashboard from "./pages/teacher/TeacherClassDashBoard.jsx";
import AddForm from "./components/FormForClass/AddFormForClass.jsx";
import TeacherAttendaceList from "./pages/teacher/TeacherAttendanceList.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/Dashboard"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        />

        <Route path="/test" element={<AddForm />} />

        <Route
          path="/admin/Student"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <ManageStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/Teacher"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <ManageTeacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/Course"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <ManageCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/Room"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <ManageRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/Class"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <ManageClass />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/Timetable"
          element={
            <ProtectedRoute roleRequired={["admin", "superadmin"]}>
              <ManageTimetable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/Dashboard"
          element={
            <ProtectedRoute roleRequired="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/Timetable"
          element={
            <ProtectedRoute roleRequired="student">
              <StudentTimetable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/Roadmap"
          element={
            <ProtectedRoute roleRequired="student">
              <StudentRoadMap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/Class/:ClassID/Discussion"
          element={
            <ProtectedRoute roleRequired="student">
              <StudentClassDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/Class/:ClassID/Feedback"
          element={
            <ProtectedRoute roleRequired="student">
              <StudentClassFeedBack />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/Dashboard"
          element={
            <ProtectedRoute roleRequired="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/Timetable"
          element={
            <ProtectedRoute roleRequired="teacher">
              <TeacherTimetable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/Class/:ClassID/Discussion"
          element={
            <ProtectedRoute roleRequired="teacher">
              <TeacherClassDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/Class/:ClassID/Attendance"
          element={
            <ProtectedRoute roleRequired="teacher">
              <TeacherAttendaceList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
