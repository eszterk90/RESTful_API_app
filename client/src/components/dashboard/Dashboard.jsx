import React, {useContext, useState} from 'react'
import UserContext from '../../context/UserContext'
import Modal from '../modal/Modal'
import {Link} from 'react-router-dom'

function Dashboard() {
    const {logout, users, getUserById, profile, setNotification} = useContext(UserContext);

    const [modal, setModal] = useState(false)
  return (
    <div>
    <h1 style={{textAlign: 'center'}}>Dashboard</h1>
    <div style={{display: 'flex', justifyContent: 'flex-end', margin: '0 auto', width: '90%'}}>
      <Link to='/profile'><button className="btn btn-secondary m-1" onClick={() =>setNotification({})}>Profile</button></Link>
      <button onClick={logout} className="btn btn-secondary m-1">Sign out</button>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem auto', width: '80%'}}>
    {users.length > 0 && users.map((user, i) => 
      <div key={i} className="card m-1" style={{width: "18rem", display: 'flex', flexDirection: 'column'}}>
        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-muted">{user.username.toUpperCase()}</h5>
          <span className="btn btn-primary" onClick={() => {setModal(true); getUserById(user)}}>See this user</span>
        </div>
      </div>
    )}
    </div>
    <Modal modal={modal} setModal={setModal}/>
    </div>
  )
}

export default Dashboard