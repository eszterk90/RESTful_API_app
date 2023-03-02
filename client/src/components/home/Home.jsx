import React, { useContext } from 'react'
import Dashboard from '../dashboard/Dashboard'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Login from '../authentication/Login'

function Home() {

const {currentUser} = useContext(UserContext);

  return (
    <div>
    {Object.keys(currentUser).length > 0 ? <Dashboard/> 
    :
    <>
    <Link to='/register'><button className="btn btn-secondary">Sign up</button></Link>
    <Login/>
    </>
    }
        
    </div>
  )
}

export default Home