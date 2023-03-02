import React, {useContext} from 'react'
import UserContext from '../../context/UserContext';

function Login() {

    const {inputHandler, login, notifications} = useContext(UserContext);
  return (
    <>
      <h1 style={{textAlign: 'center'}}>Sign in here</h1>
      <div style={{width: '50%', margin: '0 auto'}}>
        <form onSubmit={login} style={{display: 'flex', flexDirection: 'column', width: '80%', margin: '0 auto'}}>
        <div className="mb-3">
          <label for="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={inputHandler}
            className="form-control"
          />
        </div>   
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={inputHandler}
            className="form-control"
          />
        </div> 
        <input
          type="submit"
          value="sign in"
          name="sign in"
          className="btn btn-primary"
        />
        </form>
      </div>
        
        {notifications.length > 0 && 
        <div>
        <span>{notifications[notifications.length -1]}</span>
        </div>}

    </>
  )
}

export default Login