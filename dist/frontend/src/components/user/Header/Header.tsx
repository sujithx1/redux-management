import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import { AppDispatch } from '../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import {  clearUser, userLogout } from '../../../features/auth/UserService'
import { RootState } from '../../../store/store'
const Header = () => {
     
    const navigate=useNavigate()


    const dispatch:AppDispatch=useDispatch()
    const {user}=useSelector((state:RootState)=>state.auth)
    const HandleLogout=()=>{
        dispatch(userLogout())
        .then(()=>{
           
            navigate('/login')
            dispatch(clearUser())
            
        })  .catch((err)=>console.log(err)
        )
    }
  return (
   <header className='header'>
    <div className='logo'>
        <Link to='/'>Dashboard</Link>

    </div>
    <ul>
        {
        user ? 
        (
        <>
        <li>
            <Link to={'/profile'} >Profile </Link>
        </li>
        <li>
        <button  className='user_logout' onClick={HandleLogout}>Logout <FaSignOutAlt/></button> 
    </li>
        </>
    )
        :

(<>
<li>
        <Link to='/login' >Login <FaSignInAlt/> </Link>
     </li>
     <li>
         <Link to='/register' >register <FaUser/> </Link>
     </li>
</>)
     

     }
       
       
    </ul>
   </header>
  )
}

export default Header
