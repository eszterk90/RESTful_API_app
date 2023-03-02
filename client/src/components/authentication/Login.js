import React, {useContext} from 'react'
import UserContext from '../../context/UserContext';

function Login() {

    const {inputHandler, login, notifications} = useContext(UserContext);
  return (
    <>
        <h1>Sign in here</h1>
        <form onSubmit={login} style={{display: 'flex', flexDirection: 'column', width: '80%', margin: '0 auto'}}>
            <label for="username">Username</label>
            <input
            type="text"
            id="username"
            name="username"
            onChange={inputHandler}
            />
            <label for="password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            onChange={inputHandler}
            />

            <input
            type="submit"
            value="sign in"
            name="sign in"
            />
        </form>
        {notifications.length > 0 && 
        <div>
        <span>{notifications[notifications.length -1]}</span>
        </div>}

    </>
  )
}

export default Login