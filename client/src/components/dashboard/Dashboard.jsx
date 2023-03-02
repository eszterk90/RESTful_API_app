import React, {useContext, useState} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

function Dashboard() {
    const {logout, users, getUserById, profile} = useContext(UserContext);

    const [modal, setModal] = useState(false)
  return (
    <div>
    <h1 style={{textAlign: 'center'}}>User management board</h1>
    <div style={{display: 'flex', justifyContent: 'flex-end', margin: '0 auto', width: '90%'}}>
      <Link to='/profile'><button className="btn btn-secondary m-1">Profile</button></Link>
      <button onClick={logout} className="btn btn-secondary m-1">Sign out</button>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', margin: '2rem auto', width: '80%'}}>
    {users.length > 0 && users.map(user => 
      <div className="card" style={{width: "18rem", display: 'flex', flexDirection: 'column'}}>
        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-muted">{user.username}</h5>
          <span className="btn btn-primary" onClick={() => {setModal(true); getUserById(user)}}>See this user</span>
        </div>
      </div>
    )}
    </div>
    {modal && 
      <div className="card" style={{width: "18rem", display: 'flex', flexDirection: 'column'}}>
        <div className="card-body">
          <h5 className="card-title">{profile.username}</h5>
          <p className="card-text">{`${profile.username}'s birthday is on ${new Date(profile.birthday).getFullYear()}-${new Date(profile.birthday).getMonth()+1}-${new Date(profile.birthday).getDate()}, their phone number is ${profile.phoneNumber} and their zip code is ${profile.zipCode}`}</p>

        </div>
      </div>}
   
    </div>
  )
}

export default Dashboard