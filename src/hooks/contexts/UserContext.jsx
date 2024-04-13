import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Loading from "../../components/loading/Loading.jsx";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

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



    if (!isLoading) {
        return (
            <UserContext.Provider value={{ user, updateUser, token, updateToken, role, updateRole }}>
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