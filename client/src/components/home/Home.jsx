import React, { useContext } from 'react'
import Dashboard from '../dashboard/Dashboard'
import {Link} from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Login from '../authentication/Login'

function Home() {

const {currentUser, setNotification} = useContext(UserContext);

  return (
    <div>
    {Object.keys(currentUser).length > 0 ? 
      <Dashboard/> :
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Login/>
        <span>OR</span>
        <Link to='/register'><button className="btn btn-secondary m-1" style={{width: '295px'}} onClick={() => setNotification({})}>Create an account</button></Link>
      </div>
    } 
    </div>
  )
}

export default Home