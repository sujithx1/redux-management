import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './header.css'
const Header = () => {
  return (
   <header className='header'>
    <div className='logo'>
        <Link to='/'>Dashboard</Link>

    </div>
    <ul>
        <li>
            <Link to='/login' >Login <FaSignInAlt/> </Link>
        </li>
        <li>
            <Link to='/register' >register <FaUser/> </Link>
        </li>
        <li>
            <Link to='/login' >Logout <FaSignOutAlt/> </Link>
        </li>
    </ul>
   </header>
  )
}

export default Header
