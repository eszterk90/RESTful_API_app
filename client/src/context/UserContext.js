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
                if(response.data.result){
                    setCurrentUser(response.data.result)
                }
    
                setNotifications([...notifications, response.data.notification])                   
            }).catch(err => console.log(err))
    }

    const logout = () => {
        axios.get("http://localhost:5001/user/logout", {withCredentials: true})
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

    const updateUsername = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:5001/user/updatename", formData, {withCredentials: true})
            .then(response => {
                setCurrentUser(response.data)
            })
            .catch((err) => setNotifications([...notifications, err.response.data.errors[0].msg]))
    }

    const updateBirthday = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:5001/user/updatebirthday', formData, {withCredentials: true})
            .then(response => {
                setCurrentUser(response.data)
            })
            .catch((err) => setNotifications([...notifications, err.response.data.errors[0].msg]))

    }

    const updatePhoneNumber = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:5001/user/updatephone', formData, {withCredentials: true})
            .then(response => {
                setCurrentUser(response.data)
            })
            .catch((err) => setNotifications([...notifications, err.response.data.errors[0].msg]))

    }

    const updateZipCode = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:5001/user/updatezip", formData, {withCredentials: true})
            .then(response => {
                setCurrentUser(response.data)
            })
            .catch((err) => setNotifications([...notifications, err.response.data.errors[0].msg]))
    }

    const value = {inputHandler, createAccount, notifications, setNotifications,login, currentUser, logout, users, getUserById, profile, updateUsername, updateBirthday, updatePhoneNumber, updateZipCode};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserContext;