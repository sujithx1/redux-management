import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Header from "./components/user/Header/Header";
import Dashboard from "./pages/User/Dashboard";
import Login from "./pages/User/login/Login";
import Register from "./pages/User/register/Register";
function App() {
  return (
    <>
    <Router>
    <div className="container">
      <Header/> 
      <Routes>
       
       <Route path="/" element={<Dashboard/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
    
      </Routes>
    </div>

    </Router>
    </>
  );
}

export default App;
