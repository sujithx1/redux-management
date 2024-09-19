import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/User/dashboard/Dashboard";
import Login from "./pages/User/login/Login";
import Register from "./pages/User/register/Register";
import UserProfile from "./pages/User/profile/UserProfile";
import Protected from "./components/user/protect/Protected";
import LoginAdmin from "./pages/Admin/login/LoginAdmin";
import HomeAdmin from "./pages/Admin/dashboard/HomeAdmin";
import Userslist from "./pages/Admin/userlist/Userslist";
import UserEditAdmin from "./pages/Admin/useredit/UserEditAdmin";
import ProtectAdmin from "./components/admin/protect/ProtectAdmin";

function App() {
  return (
    <>
      <Router>
        <div className="container">
      
          <Routes>
            <Route
              path="/"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  <UserProfile />
                </Protected>
              }
            />
            <Route path="/admin/login" element={<LoginAdmin/>} />
            <Route path="/admin/home" element={
              <ProtectAdmin>

                <HomeAdmin/>
              </ProtectAdmin>
              } />
            <Route path="/admin/users" element={
              <ProtectAdmin>
                <Userslist/>
                </ProtectAdmin>
                } />
            <Route path="/admin/user/edit" element={
              <ProtectAdmin>

                <UserEditAdmin/>
              </ProtectAdmin>
              } />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
