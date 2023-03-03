import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

function Profile() {

const {currentUser, inputHandler, updateUsername, setNotification, updateBirthday, notification, updatePhoneNumber, updateZipCode, deleteUser} = useContext(UserContext);
  return (
    <div>
    <div className="card" style={{width: "18rem", display: 'flex', flexDirection: 'column'}}>
        <div className="card-body">
          <h5 className="card-title">{currentUser.username}</h5>
          <p className="card-text">Username: {currentUser.username}</p>
          <form>
            <input onChange={inputHandler} name='username'/>
            <input type="submit" value="update username" onClick={updateUsername}/>
          </form>
          <p className="card-text">Birthday: {new Date(currentUser.birthday).getFullYear()}-{new Date(currentUser.birthday).getMonth() +1}-{new Date(currentUser.birthday).getDate()}</p>
          <form>
            <input onChange={inputHandler} name='birthday'/>
            <input type="submit" value="update birthday" onClick={updateBirthday}/>
          </form>
          <p className="card-text">Phone number: {currentUser.phoneNumber}</p>
          <form>
            <input onChange={inputHandler} name='phoneNumber'/>
            <input type="submit" value="update phone number" onClick={updatePhoneNumber}/>
          </form>
          <p className="card-text">Zip code: {currentUser.zipCode}</p>
          <form>
          <input onChange={inputHandler} name='zipCode'/>
          <input type="submit" value="update zip code" onClick={updateZipCode}/>
        </form>
        </div>
      </div>
      <Link to='/'><button type="button" className="btn btn-secondary" onClick={() => setNotification({})}>Home</button></Link>
      <Link to='/'><button className="btn btn-danger" onClick={deleteUser}>Delete user</button></Link>
      <span>{Object.keys(notification).length > 0 && notification}</span>
      </div>
  )
}

export default Profile