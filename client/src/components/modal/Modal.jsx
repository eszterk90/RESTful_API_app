import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'

function Modal({modal, setModal}) {

    const {profile} = useContext(UserContext);
  return (
    <>
    {modal && 
        <div className="card modal" style={{width: "18rem", display: 'flex', flexDirection: 'column'}}>
            <span onClick={() => setModal(false)} style={{alignSelf: 'flex-end', padding: '1.5rem'}}>X</span>
          <div className="card-body">
            <h5 className="card-title">{profile.username}</h5>
            <p className="card-text">{`${profile.username}'s birthday is on ${new Date(profile.birthday).getFullYear()}-${new Date(profile.birthday).getMonth()+1}-${new Date(profile.birthday).getDate()}, their phone number is ${profile.phoneNumber} and their zip code is ${profile.zipCode}`}</p>
          </div>
        </div>}
    </>
  )
}

export default Modal