import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

function Registration() {

const {createAccount, inputHandler, notifications, setNotifications} = useContext(UserContext)

  return (
    <>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <h1>Registration</h1>
          <Link to='/'><button type="button" className="btn btn-secondary" onClick={() => setNotifications([])}>Home</button></Link>
        </div>
        <div style={{width: '50%', margin: '0 auto'}}>
        <form onSubmit={createAccount}>
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
            placeholder="birthday"
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
            placeholder="zip code"
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
            placeholder="phone"
            onChange={inputHandler}
            required
            className="form-control"
          />
        </div>   
        <input type="submit" value="sign up" name="sign up" className="btn btn-primary"/>
        </form>
        <div>
        {notifications.length > 0 && 
            <div>
                <span>{notifications[notifications.length -1]}</span>
            </div>}
        </div>
        </div>
    </>
  )
}

export default Registration