import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Loading from "../../components/loading/Loading.jsx";
import instance from "../../services/api/instance.js";
import {fetchAuthenticatedUser} from "../../data/auth/authenticationData.js";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [pageToLoadAfterRequiredAuth,setPageToLoadAfterRequiredAuth] = useState(null);
    const [forceReRender,setForceReRender] =  useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedToken) {
            setToken(storedToken);
        }

        if (storedRole) {
            setRole(storedRole);
        }
       setTimeout(() => {
           setIsLoading(false);
       },1000)
    }, []);

    const updateUser = useCallback((newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    }, []);

    const updateToken = useCallback((newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }, []);

    const updateRole = useCallback((newRole) => {
        localStorage.setItem('role', newRole);
        setRole(newRole);
    }, []);


    const logout = useCallback(() =>{
       setToken(null);
       setUser(null);
       setRole(null);
    });


    const syncUserData = async () => {
        const res = await fetchAuthenticatedUser();
        if (res.data.case === 'success'){
            localStorage.setItem('user',JSON.stringify(res.data.user));
        }
        else{
            console.log(res.data.message);
        }
    }

    useEffect(() => {
        if (token) {
            instance.defaults.headers.common["Authorization"] =
                "Bearer " + token;
            localStorage.setItem("token", token);
        } else {
            delete instance.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
       if(user){
           setForceReRender(true);
       }
    }, [user]);




    if (!isLoading) {
        return (
            <UserContext.Provider value={{ user, updateUser, syncUserData,token, updateToken, logout ,role, updateRole , setPageToLoadAfterRequiredAuth , pageToLoadAfterRequiredAuth}}>
                {children}
            </UserContext.Provider>
        );
    } else {
        return (
            <Loading/>
        );

    }
};

export const useUser = () => useContext(UserContext);