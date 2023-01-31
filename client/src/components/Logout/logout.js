import React, { useContext } from 'react';
import {faSignOut} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios';
import AuthContext from '../../hoc/AuthContext/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    async function logOut(){
        await axios.get('https://haicore.up.railway.app/logout');
        await getLoggedIn();
        navigate('/');
    }

    return (
        <button onClick={logOut}>
            <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
        </button>
    );
};

export default Logout;