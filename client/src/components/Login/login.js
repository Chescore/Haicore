import React, { useContext, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AuthContext from '../../hoc/AuthContext/auth';

const Login = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState:{errors}} = useForm();

    const  [error, setError] = useState(null);

    const [authDetails, setAuthDetails] = useState({
        email:'',
        password:''
    })

    async function onSubmit(e){
        try{
            await axios.post('https://haicore.onrender.com/login', authDetails);
            await getLoggedIn();
            navigate('/create');
        }catch(err){
            setError(err.response.data);
        }
    }

    return (
        <div className='block p-8 shadow border m-4 max-w-md'>
            <div className='mb-3 text-3xl color-fit'>
                Sign in to your Account
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                    <div className='py-4'>
                        <label className='inline-block color-fit mb-2'>Email</label>
                        <input type='text' 
                            {...register("email",{required:{
                                value:true,message:"Your email address is required"
                            },pattern:{
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address"
                            }})}
                            className='block w-full px-4 py-3  
                            bg-clip-padding border border-solid border-slate-400 rounded transition 
                            ease-in-out m-0 focus:border-sky-400 focus:outline-none placeholder:text-slate-200'
                            placeholder='Email address'
                            onChange={(e)=>setAuthDetails({...authDetails,email:e.target.value})}
                            value={authDetails.email}/>
                            <div className='text-red-700'>
                                {errors?.email?.message}
                                {error? <div>Invalid email or password</div>:null }
                            </div>
                    </div>
                    <div className='py-2'>
                        <label className='inline-block color-fit mb-2'>Password</label>
                        <input type='password' 
                            {...register("password",{
                                required:{value:true,message:'Your password is required'}
                            })}
                            className='block w-full px-4 py-3  
                            bg-clip-padding border border-solid border-slate-400 rounded transition 
                            ease-in-out m-0 focus:border-sky-400 focus:outline-none placeholder:text-slate-200'
                            placeholder='Password'
                            onChange={(e)=>setAuthDetails({...authDetails,password:e.target.value})}
                            value={authDetails.password}/>
                            <div className='text-red-700'>
                                {errors?.password?.message}
                                {error? <div>Invalid email or password</div>:null }
                            </div>
                    </div>
                </div>
                <div>
                    <Link to='/signup'><label className='text-sm text-slate-600 tracking-wider cursor-pointer hover:text-slate-400'>Don't have an account? Sign up</label></Link>
                    <button type='submit' className='mx-8 border-violet-900 hover:bg-violet-900 hover:text-white border color-fit
                                                         font-bold text-sm cursor-pointer text-center py-2 px-4 rounded'>
                                                            Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;