import React, {useState} from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    isAdmin: false,
    user: null,
    flight: null,
    login: (isAuth) => {},
    logout: () => {}
});

export const AuthContextProvider = (props) => {
    const [isAuth, setAuth] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [flight, setFlight] = useState();

    const flightHandler = (flight) => {
        setFlight(flight);
    }

    const userHandler = (user) => {
        setUser(user);
    }

    const adminHandler = (isAdmin) => {
        if(isAdmin == null) {
            setAdmin(false);
        } else {
            setAdmin(isAdmin);
        }
    } 

    const loginHandler = (isAuth) => {
        setAuth(isAuth);
    };

    const logoutHandler = () => {
        setAuth(false);
    }

    const contextValue = {
        isAuth: isAuth,
        isAdmin: isAdmin,
        user: user,
        flight: flight,
        newFlight: flightHandler,
        newUser: userHandler,
        newAdmin: adminHandler,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value = {contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;