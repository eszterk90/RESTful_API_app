import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

function Registration() {

const {createAccount, inputHandler, notification, setNotification} = useContext(UserContext)

  return (
    <>
    <div>
      <h1 style={{textAlign: "center"}}>Registration</h1>
    </div>
    <div style={{width: '50%', margin: '0 auto'}}>
    <form onSubmit={createAccount} style={{display: 'flex', flexDirection: 'column'}}>

    <div className="mb-3">
      <label for="username" className="form-label">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="username"
        onChange={inputHandler}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label for="password" className="form-label">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        onChange={inputHandler}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label for="birthday" className="form-label">Birthday</label>
      <input
        type="text"
        id="birthday"
        name="birthday"
        placeholder="YYYY-MM-DD"
        required
        onChange={inputHandler}
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label for="zipCode" className="form-label">Zip Code</label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        placeholder="e.g. 12345"
        required
        onChange={inputHandler}
        className="form-control"
      />
    </div>

    <div>
      <label for="phone" className="form-label">Phone Number</label>
      <input
        type="text"
        id="phone"
        name="phoneNumber"
        placeholder="e.g. 1234567890"
        onChange={inputHandler}
        required
        className="form-control"
      />
    </div> 

    <input type="submit" value="sign up" name="sign up" className="btn btn-primary m-1"/>
    </form>
    
    <Link to='/'><button type="button" className="btn btn-secondary m-1" onClick={() => setNotification({})}>Back to login</button></Link>
      <div>
      {Object.keys(notification).length > 0 && 
        <div>
          <span>{notification}</span>
        </div>}
    </div>
    </div>
    </>
  )
}

export default Registration