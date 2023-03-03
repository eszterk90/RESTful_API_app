import Home from './components/home/Home';
import {Route, Routes} from 'react-router-dom';
import Registration from './components/authentication/Registration';
import Login from './components/authentication/Login';
import Profile from './components/profile/Profile'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </div>
  );
}

export default App;
