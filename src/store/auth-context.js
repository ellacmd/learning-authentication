import { createContext, useState } from 'react';
const AuthContext = createContext({
    token: null,
    login: (token) => {},
    logout: () => {},
    isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;
    const contextValue = {
        token: token,
        login: (token) => {
            setToken(token);
        },
        logout: () => {
            setToken(null);
        },
        isLoggedIn: userIsLoggedIn,
    };
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
export default AuthContext;
