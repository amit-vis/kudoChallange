import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { base_url } from './baseuser';
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export const useUser = () => {
    const value = useContext(userContext);
    return value;
};

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [signinUser, setSigninUser] = useState({ email: '', password: '' });
    const [loginUser, setLoginUser] = useState('');
    const [dropdownUser, setDropDownUser] = useState([])
    const [getUserName, setGetUserName] = useState(() => {
        // Retrieve user data from localStorage on initial load
        const storedUser = localStorage.getItem('getUserName');
        return storedUser ? JSON.parse(storedUser) : '';
    });

    console.log(dropdownUser)

    const handlesignup = async () => {
        try {
            const res = await axios.post(`${base_url}/user/create`, user,{
                headers:{
                    'Content-Type': "application/json"
                }
            });
            if (res.status === 201) {
                alert(res.data.message);
                setUser({ name: '', email: '', password: '' });
                navigate('/');
                return;
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

    const handlesignin = async () => {
        try {
            const res = await axios.post(`${base_url}/user/signin`, signinUser,{
                headers:{
                    'Content-Type': "application/json"
                }
            });
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                alert(res.data.message);
                setSigninUser({ email: '', password: '' });
                navigate('/log-in');
                return;
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Signin failed');
        }
    };

    const handleLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${base_url}/user/login`, { name: loginUser }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': "application/json"
                    }
                }
            );
            if (res.status === 200) {
                setGetUserName(res.data.data);
                localStorage.setItem('getUserName', JSON.stringify(res.data.data));
                setLoginUser('');
                alert(res.data.message);
                navigate('/landing-page');
                return;
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    const getUserData = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${base_url}/user/getUsers`, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });
            console.log("here ids ", res)
            if(res.status === 200){
                setDropDownUser(res.data.date)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // Sync state with localStorage if data changes
        if (getUserName) {
            localStorage.setItem('getUserName', JSON.stringify(getUserName));
        }
    }, [getUserName]);

    return (
        <userContext.Provider value={{
            user, setUser, handlesignup,
            signinUser, setSigninUser, handlesignin,
            loginUser, setLoginUser, handleLogin, getUserName,
            dropdownUser, getUserData
        }}>
            {children}
        </userContext.Provider>
    );
};
