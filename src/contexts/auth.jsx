import axios from "axios";
import React, { useMemo } from "react";

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const memoizedUser = useMemo(() => {
        if(!user){
            const storeUser = localStorage.getItem('@_u_@');
            const userParsed = JSON.parse(storeUser);
            setUser(userParsed);
            setLoading(false);
            return userParsed;
        }
        setLoading(false);
        return user;
    }, [user]);

    const logout = () => {
        localStorage.removeItem("@_u_@");
        setUser(null);
    };

    async function login(email, password) {
        const response = await axios.post("https://api-contas-trade4devs.herokuapp.com/login", {
            email,
            senha: password
        });
        if (response.status === 200) {
            storeUser(response.data);
            setUser(response.data);
            setLoading(false);
        } else {
            setLoading(false);
            throw new Error("Erro ao fazer login, verifique seu e-mail e senha");
        }
    };

    function storeUser(data){
        localStorage.setItem('@_u_@', JSON.stringify({loggedinat: new Date().getTime()}));
    }
    
    return (
        <AuthContext.Provider value={{ signed: !! memoizedUser, user, loading, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
