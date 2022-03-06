import React, { useState, useContext } from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from './components/Home/home';
import Create from './components/Create/create';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import ProfilePage from './components/ProfilePage/profile';
import AuthContext from './hoc/AuthContext/auth';

const Router = () => {
    const {loggedIn} = useContext(AuthContext);

    const [currentId, setCurrentId] = useState(null);
    console.log(currentId);

    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                {loggedIn===false&&(
                    <>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    </>
                )}
                {loggedIn===true&&(
                    <>
                        <Route path='/create' element={<Create currentId={currentId} setCurrentId={setCurrentId}/>}/>
                        <Route path ='/profile' element={<ProfilePage setCurrentId={setCurrentId}/>}/>
                    </>
                )}
            </Routes>
        </div>
    );
};

export default Router;