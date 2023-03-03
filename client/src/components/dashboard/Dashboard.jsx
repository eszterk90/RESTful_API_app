import React, {useContext, useState} from 'react'
import UserContext from '../../context/UserContext'
import Modal from '../modal/Modal'
import {Link} from 'react-router-dom'
import Pagination from '../pagination/Pagination';
import Sort from '../sort/Sort';

function Dashboard() {
    const {logout, users, getUserById, setNotification, setSearch, setSort} = useContext(UserContext);

    const [modal, setModal] = useState(false)
  return (
    <div>
    <h1 style={{textAlign: 'center'}}>Dashboard</h1>
    <Sort setSort={(sort) => setSort(sort)}/>
    <div style={{display: 'flex', justifyContent: 'flex-end', margin: '0 auto', width: '90%'}}>
      <Link to='/profile'><button className="btn btn-secondary m-1" onClick={() =>setNotification({})}>Profile</button></Link>
      <button onClick={logout} className="btn btn-secondary m-1">Sign out</button>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <form style={{width: "60%", margin: '0 auto'}}>
        <label>Search</label>
        <input className="form-control m-1" onChange={(e) => setSearch(e.target.value)}/>
      </form>
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
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Pagination/>
    </div>
    </div>
  )
}

export default Dashboard