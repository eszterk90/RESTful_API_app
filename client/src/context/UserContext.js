import {createContext, useState} from 'react';
import axios from "axios";
import useLocalStorage from "use-local-storage";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [formData, setFormData] = useState({})
    const [notifications, setNotifications] = useState([])
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {})

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const createAccount = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/user/create", formData, {withCredentials: true})
            .then(response => {
                setNotifications([...notifications, response.data.notification])
            })
            .catch((err) => console.log(err))
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/user/login", formData, {withCredentials: true})
            .then((response, err) => {
                if(response.data.token){
                    setCurrentUser(response.data.token)
                }
    
                setNotifications([...notifications, response.data.notification])                   
            })
    }

    const logout = () => {
        axios.get("http://localhost:5001/user/logout")
          .then(() => {
            setCurrentUser({});
            setNotifications([]);
            localStorage.clear();
          })
          .catch((err) => console.log(err));
      };

    const value = {inputHandler, createAccount, notifications, login, currentUser, logout};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserContext;