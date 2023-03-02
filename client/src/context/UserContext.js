import {createContext, useEffect, useState} from 'react';
import axios from "axios";
import useLocalStorage from "use-local-storage";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [formData, setFormData] = useState({})
    const [notifications, setNotifications] = useState([])
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {})
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({});

    axios.interceptors.request.use(
        req => {
          req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
          console.log(req.headers.Authorization)
          return req;
        },
        error => {
          return Promise.reject(error);
        }
      )

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const createAccount = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/user/create", formData, {withCredentials: true})
            .then(response => {
                if(response.data.notification) {
                    setNotifications([...notifications, response.data.notification])
                }
            })
            .catch((err) => setNotifications([...notifications, err.response.data.errors[0].msg]))
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/user/login", formData, {withCredentials: true})
            .then((response, err) => {
                if(response.data.token){
                    localStorage.setItem('token', response.data.token);
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

    const getAllUsers = () => {
        axios.get("http://localhost:5001/user/all", {withCredentials: true})
        .then(response => {
            console.log(response.data)
            setUsers(response.data)
        }
        )
    }

    useEffect(() => {
        if(Object.keys(currentUser).length > 0) {
            getAllUsers()
        }
    }, [currentUser])

    const getUserById = (user) => {
        const userId = user._id;
        axios.get(`http://localhost:5001/user/${userId}`, {withCredentials: true})
            .then(response => {
                setProfile(response.data)
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    const value = {inputHandler, createAccount, notifications, setNotifications,login, currentUser, logout, users, getUserById, profile};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserContext;