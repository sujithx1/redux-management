import Headeradmin from "../../../components/admin/header/Headeradmin"
import './homeadmin.css'

const HomeAdmin = () => {
  return (
    <>
    <Headeradmin/>

    
    <div className="admin-dashboard">
        
        <div className="main-content">
          <h2>Welcome, Admin!</h2>
          <p>This is your dashboard. Here you can manage users, settings, and more.</p>
        </div>
      </div>
    
    
    </>

  )
}

export default HomeAdmin