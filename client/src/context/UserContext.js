import {createContext, useEffect, useState} from 'react';
import axios from "axios";
import useLocalStorage from "use-local-storage";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [formData, setFormData] = useState({})
    const [notification, setNotification] = useState({})
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', {})
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState({});
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({sort: '_id', order: 'desc'});
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(0);

    const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const createAccount = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/user/create", formData, {withCredentials: true})
        .then(response => {
            if(response.data.notification) {
                setNotification(response.data.notification)
            }
        })
        .catch((err) => setNotification(err.response.data.errors[0].msg))
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/user/login", formData, {withCredentials: true})
        .then((response, err) => {
            if(response.data.result){
                setCurrentUser(response.data.result)
            }
            setNotification(response.data.notification)                   
        })
        .catch(err => console.log(err))
    }

    const logout = () => {
        axios.get("http://localhost:5001/user/logout", {withCredentials: true})
        .then(() => {
            setCurrentUser({});
            setNotification({});
            localStorage.clear();
        })
        .catch((err) => console.log(err));
    };

    const getAllUsers = () => {
        axios.get(`http://localhost:5001/user/all?page=${page}&sort=${sort.sort},${sort.order}&search=${search}`, {withCredentials: true})
        .then(response => {
            setUsers(response.data.users);
            setTotal(response.data.total);
            setLimit(response.data.limit);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(Object.keys(currentUser).length > 0) {
            getAllUsers()
        }
    }, [currentUser, search, page, sort])

    const getUserById = (user) => {
        const userId = user._id;
        axios.get(`http://localhost:5001/user/${userId}`, {withCredentials: true})
        .then(response => {
            setProfile(response.data)
        })
        .catch(err => console.log(err))
    }

    const updateUsername = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:5001/user/updatename", formData, {withCredentials: true})
        .then(response => {
            setCurrentUser(response.data)
        })
        .catch((err) => setNotification(err.response.data.errors[0].msg))
    }

    const updateBirthday = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:5001/user/updatebirthday', formData, {withCredentials: true})
        .then(response => {
            setCurrentUser(response.data)
        })
        .catch((err) => setNotification(err.response.data.errors[0].msg))
    }

    const updatePhoneNumber = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:5001/user/updatephone', formData, {withCredentials: true})
        .then(response => {
            setCurrentUser(response.data)
        })
        .catch((err) => setNotification(err.response.data.errors[0].msg))
    }

    const updateZipCode = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:5001/user/updatezip", formData, {withCredentials: true})
        .then(response => {
            setCurrentUser(response.data)
        })
        .catch((err) => setNotification(err.response.data.errors[0].msg))
    }

    const deleteUser = () => {
        axios.delete('http://localhost:5001/user/delete', {withCredentials: true})
        .then(response => {
            setCurrentUser({})
            setNotification(response.data.notification)
        })
        .catch(err => console.log(err))
    }

    const value = {
        inputHandler, 
        createAccount, 
        notification, 
        setNotification,
        login, 
        currentUser, 
        logout, users, 
        getUserById, 
        profile, 
        updateUsername, 
        updateBirthday, 
        updatePhoneNumber, 
        updateZipCode, 
        deleteUser, 
        getAllUsers, 
        setSearch, 
        total, 
        page, 
        setPage, 
        limit, 
        sort, 
        setSort
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserContext;