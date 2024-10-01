import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import './dashbord.css'
import Header from "../../../components/user/Header/Header";


const Dashboard = () => {
  console.log("dashboard rendint");


  const {user}=useSelector((state:RootState)=>state.auth)
  console.log("dashboard user",user);
  

  return (
    <>
   <Header/>
<div className="dashboard-container">

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, {user?.username || "User"}!</h1>
        </header>
        <section className="dashboard-content">
          <div className="user-card">
            <h2>User Information</h2>
            <img
              src={user?.image ? `http://localhost:3001/uploads/${user.image}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="user-profile-image"
            />
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
          </div>
        </section>
      </main>
    </div>
    </>
  )
}

export default Dashboard