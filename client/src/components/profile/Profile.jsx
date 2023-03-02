import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'

function Profile() {

const {currentUser, inputHandler, updateUsername} = useContext(UserContext);
  return (
    <div className="card" style={{width: "18rem", display: 'flex', flexDirection: 'column'}}>
        <div className="card-body">
          <h5 className="card-title">{currentUser.username}</h5>
          <p className="card-text">Username: {currentUser.username}</p>
          <form>
            <input onChange={inputHandler} name='username'/>
            <input type="submit" value="update username" onClick={updateUsername}/>
          </form>
          <p className="card-text">Birthday: {new Date(currentUser.birthday).getFullYear()}-{new Date(currentUser.birthday).getMonth() +1}-{new Date(currentUser.birthday).getDate()}</p>
          <p className="card-text">Phone number: {currentUser.phoneNumber}</p>
          <p className="card-text">Zip code: {currentUser.zipCode}</p>
        </div>
      </div>
  )
}

export default Profile