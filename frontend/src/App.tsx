import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Groups from "./pages/Group";
import GroupDetail from "./pages/GroupDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from './pages/Dashboard';


function App() {

  return (
    <BrowserRouter>
    <Routes>
          {" "}
          <Route path="/login"  element={<SignIn />}></Route>
          <Route path="/signup"  element={<SignUp />}></Route>
          <Route path="/"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/group/:id" element={<ProtectedRoute><GroupDetail /></ProtectedRoute>}></Route>
          <Route path="/group" element={<ProtectedRoute><Groups /></ProtectedRoute>}></Route>

        </Routes>
  </BrowserRouter>
  )
}

export default App
