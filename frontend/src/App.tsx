import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Groups from "./pages/Group";
import GroupDetail from "./pages/GroupDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from './pages/Dashboard';
import EventDetail from './pages/EventDetail'
import Members from './pages/Members';
import Events from './pages/Events';
import NotFound from './pages/NotFound';


function App() {

  return (
    <BrowserRouter>
    <Routes>
          {" "}
          <Route path="/login"  element={<SignIn />}></Route>
          <Route path="/signup"  element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/group/:id" element={<ProtectedRoute><GroupDetail /></ProtectedRoute>}></Route>
          <Route path="/group" element={<ProtectedRoute><Groups /></ProtectedRoute>}></Route>
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>}></Route>

          <Route path="/event/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>}></Route>

          <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>}></Route>



        </Routes>
  </BrowserRouter>
  )
}

export default App
