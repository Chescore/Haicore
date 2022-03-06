import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [loggedIn,setLoggedIn] = useState(undefined);

    async function getLoggedIn(){
        const loggedInResponse = await axios.get("http://localhost:5000/haicore/loggedIn");
        setLoggedIn(loggedInResponse.data);
    }

    useEffect(()=>{
        getLoggedIn()
    },[]);

    return(
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthContext;
export { AuthContextProvider };