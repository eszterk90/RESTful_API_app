import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'


function Dashboard() {
    const {logout} = useContext(UserContext);
  return (
    <div>
    <h1>Dashboard</h1>
    <button onClick={logout}>Sign out</button>
    </div>
  )
}

export default Dashboard