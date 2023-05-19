import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../hoc/AuthContext/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    async function logOut(){
        await axios.get('https://haicore.onrender.com/logout');
        await getLoggedIn();
        navigate('/');
    }

    return (
        <button onClick={logOut}>
            Log out
        </button>
    );
};

export default Logout;