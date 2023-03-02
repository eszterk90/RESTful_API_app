import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'
import {Link} from 'react-router-dom'

function Registration() {

    const {createAccount, inputHandler, notifications} = useContext(UserContext)
  return (
    <>
        <h1>Sign up here</h1>
        <div>
        <form onSubmit={createAccount} style={{display: 'flex', flexDirection: 'column', width: '80%', margin: '0 auto'}}>
            <label for="username">Username</label>
            <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={inputHandler}
            required
            />
            <label for="password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={inputHandler}
            required
            />
            <label for="birthday">Birthday</label>
            <input
            type="text"
            id="birthday"
            name="birthday"
            placeholder="birthday"
            required
            onChange={inputHandler}
            />
            <label for="zipcode">Zip Code</label>
            <input
            type="number"
            id="zipCode"
            name="zipCode"
            placeholder="zip code"
            required
            onChange={inputHandler}
            />
            <label for="phone">Phone Number</label>
            <input
            type="phone"
            id="phone"
            name="phoneNumber"
            placeholder="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            />
            <input type="submit" value="sign up" name="sign up"/>
        </form>
        </div>
        <Link to='/'><button>Home</button></Link>
        {notifications.length > 0 && 
            <div>
                <span>{notifications[0]}</span>
                <Link to="/"><button>Go to login</button></Link>
            </div>}
    </>
  )
}

export default Registration