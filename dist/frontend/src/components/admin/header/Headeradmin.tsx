

import { useNavigate } from 'react-router-dom'
import'./headeradmin.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { adminreset, clearAdmin } from '../../../features/auth/AdminService'
const Headeradmin = () => {
    const navigate=useNavigate()

    const dispatch=useDispatch<AppDispatch>()


    const handleLogout=()=>{
        dispatch(clearAdmin())
        navigate('/admin/login')
        dispatch(adminreset())



    }

  return (

   <>
   <header className="header-admin">
      <div className="logo" onClick={()=>navigate('/admin/home')} >Admin Dashboard</div>
      
      <nav className="nav-admin">
        <button className="nav-btn" onClick={() => navigate('/admin/users')}>
          Users
        </button>

       

        <button className="nav-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>

   </>
  )
}

export default Headeradmin