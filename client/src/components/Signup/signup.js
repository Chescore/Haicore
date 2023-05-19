import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AuthContext from '../../hoc/AuthContext/auth';

const Signup = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState:{errors}} = useForm();

    const  [error, setError] = useState(null);

    const [authDetails,setAuthDetails]=useState({
        username:'',
        email:'',
        password:'',
        passwordVerify:''
    })

    async function onSubmit(){
        try{
            await axios.post("https://haicore.onrender.com/register", authDetails);
            await getLoggedIn(); 
            navigate('/create');
        }catch(err){
            setError(err.response.data);
        }
    }

    return (
        <div className='p-8 m-4 border shadow max-w-md'>
            <div className='color-fit text-3xl'>
                Create a new Account
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                    <div className='py-4'>
                        <label className='inline-block color-fit mb-2'>Username</label>
                        <input type='text'
                            {...register("username",{required:{
                                value:true,message:"Your username is required"
                            }})}
                            className='block w-full px-4 py-3  
                            bg-clip-padding border border-solid border-slate-400 rounded transition 
                            ease-in-out m-0 focus:border-sky-400 focus:outline-none placeholder:text-slate-200'
                            placeholder='Username'
                            onChange={(e)=>setAuthDetails({...authDetails,username:e.target.value})}
                            value={authDetails.username}/>
                        <div className='text-red-700'>
                            {errors?.username?.message}
                            {error==='Username already exists'?<div>This username is already in use</div>:null}    
                        </div>
                    </div>
                    <div className='py-2'>
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
                                {error==='Email already exists'? <div>This email is already in use</div>:null }
                            </div>
                    </div>
                    <div className='py-2'>
                        <label className='inline-block color-fit mb-2'>Password</label>
                        <input type='password' 
                            {...register("password",{
                                required:{value:true,message:'Create a new password'}
                            })}
                            className='block w-full px-4 py-3  
                            bg-clip-padding border border-solid border-slate-400 rounded transition 
                            ease-in-out m-0 focus:border-sky-400 focus:outline-none placeholder:text-slate-200'
                            placeholder='Create new password'
                            onChange={(e)=>setAuthDetails({...authDetails,password:e.target.value})}
                            value={authDetails.password}/>
                            <div className='text-red-700'>
                                {errors?.password?.message}
                            </div>
                    </div>
                    <div className='py-2'>
                        <label className='inline-block color-fit mb-2'>Confirm password</label>
                        <input type='password' 
                            {...register("passwordVerification",{
                                    required:{value:true,message:'Verify the password entered'}
                            })}
                            className='block w-full px-4 py-3  
                            bg-clip-padding border border-solid border-slate-400 rounded transition 
                            ease-in-out m-0 focus:border-sky-400 focus:outline-none placeholder:text-slate-200'
                            placeholder='Verify your password'
                            onChange={(e)=>setAuthDetails({...authDetails,passwordVerify:e.target.value})}
                            value={authDetails.passwordVerify}/>
                             <div className='text-red-700'>
                                {errors?.passwordVerification?.message}
                                {error==='Passwords dont match'? <div>Passwords do not match</div>:null }

                            </div>
                    </div>
                    <div className='pt-6'>
                        <Link to='/login'><label className='text-sm text-slate-600 hover:text-slate-400 tracking-wider cursor-pointer active:text-slate-800'>Existing account? Log in</label></Link>
                        <button type='submit' className='mx-8 border-violet-900 hover:bg-violet-900 hover:text-white border color-fit font-bold text-sm cursor-pointer text-center py-2 px-4 rounded'>Sign up</button>
                    </div>

                </div>
                
            </form>
        </div>
    );
};

export default Signup;