import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../hoc/AuthContext/auth';
import logo from '../../img/logo.png';
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
                <div key={i} className='px-4 py-6'>
                    <Link to={item.link} className='hover:text-blue-300'>{item.text}</Link>
                </div>
            )
        })
    }

    return (
        <div className='flex justify-between font-spectral py-4 shadow color-fit'>
            <div className='flex px-4'>
                <Link to={'/'}><img className='object-cover h-20' src={logo} alt='Haicore Logo'/>
                </Link>
            </div>
            {loggedIn === false &&(
                <div className='flex justify-end'>{showItems()}</div>
            )}
            {loggedIn === true && (
                <div className='flex justify-end'> 
                    <div className='px-4 py-6 hover:text-slate-500'>
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </div>
                    <div className='px-4 py-6 hover:text-slate-500'>
                            <Logout/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;