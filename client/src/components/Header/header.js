import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../hoc/AuthContext/auth';
import logo from '../../img/logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Logout from '../Logout/logout';

const Header = () => {
    const { loggedIn } = useContext(AuthContext);

    const items=[
        {
            text:'Login',
            link:'/login'
        },
        {
            text:'Sign up',
            link:'/signup'
        }
    ]
    
    const showItems = () =>{
        return items.map((item,i)=>{
            return(
                <div key={i} className='px-4 py-6 font-bold hover:text-slate-400 active:text-slate-300'>
                    <Link to={item.link}>{item.text}</Link>
                </div>
            )
        })
    }

    return (
        <div className='flex justify-between bg-slate-900'>
            <div className='flex px-4 py-2'>
                <Link to={'/'}><img className='object-cover h-16' src={logo} alt='Haicore Logo'/></Link>
            </div>
            {loggedIn === false &&(
                <div className='flex justify-end'>{showItems()}</div>
            )}
            {loggedIn === true && (
                <div className='flex justify-end'> 
                    <div className='px-6 py-6 text-xl hover:text-slate-400 active:text-slate-300'>
                        <Link to='/profile'>
                            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                        </Link>
                    </div>
                    <div className='px-6 py-6 text-xl hover:text-slate-400 active:text-slate-300'>
                            <Logout/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;