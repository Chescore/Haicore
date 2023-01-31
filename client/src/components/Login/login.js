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
            await axios.post('https://haicore.up.railway.app/login', authDetails);
            await getLoggedIn();
            navigate('/create');
        }catch(err){
            setError(err.response.data);
        }
    }

    return (
        <div className='block p-8 rounded-xl shadow-lg m-4 bg-zinc-200 max-w-md'>
            <div className='font-extrabold text-2xl'>
                Sign in to your Account
            </div>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                    <div className='py-4'>
                        <label className='font-extrabold inline-block mb-2'>Email</label>
                        <input type='text' 
                            {...register("email",{required:{
                                value:true,message:"Your email address is required"
                            },pattern:{
                                value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address"
                            }})}
                            className='block w-full px-4 py-3 text-sm font-spectral 
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
                        <label className='font-extrabold inline-block mb-2'>Password</label>
                        <input type='password' 
                            {...register("password",{
                                required:{value:true,message:'Your password is required'}
                            })}
                            className='block w-full px-4 py-3 text-sm font-spectral 
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
                    <Link to='/signup'><label className='text-sm text-slate-400 tracking-wider cursor-pointer hover:text-slate-600 active:text-slate-800'>Don't have an account? Sign up</label></Link>
                    <button type='submit' className='mx-8 border-zinc-500 hover:bg-zinc-500 hover:text-slate-200 border-2 text-zinc-500 font-spectral active:bg-zinc-700 font-bold text-sm cursor-pointer text-center py-2 px-4 rounded-full'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;