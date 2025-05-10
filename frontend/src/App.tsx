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
import MemberEvents from './pages/MemberEvent';
import UpcomingEvents from './pages/UpcomingEvents';
import MyEvents from './pages/MyEvents';
import Attending from './pages/Attending';
import EventRequests from './pages/EventRequests';
import ManageUsers from './pages/ManageUsers';
import ManageEvents from './pages/ManageEvents';


function App() {

  return (
    <BrowserRouter>
    <Routes>
          {" "}
          <Route path="/login"  element={<SignIn />}></Route>
          <Route path="/signup"  element={<SignUp />}></Route>
          <Route path="/memberEvents/:id?/:code?" element={<MemberEvents />} />
          <Route path="/"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
          <Route path="/group/:id" element={<ProtectedRoute><GroupDetail /></ProtectedRoute>}></Route>
          <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>}></Route>
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>}></Route>

          <Route path="/event/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>}></Route>

          <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>}></Route>
          <Route path="/upcoming-events" element={<ProtectedRoute><UpcomingEvents /></ProtectedRoute>}></Route>
          <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>}></Route>
          <Route path="/attending" element={<ProtectedRoute><Attending /></ProtectedRoute>}></Route>
          <Route path="/event-requests" element={<ProtectedRoute><EventRequests /></ProtectedRoute>}></Route>
          <Route path="/manage-users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>}></Route>
          <Route path="/manage-events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>}></Route>
          <Route path="*" element={<NotFound />} />




        </Routes>
  </BrowserRouter>
  )
}

export default App
