import React,{useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {syllable} from 'syllable';
import moment from 'moment';
import { createPosts, updatePosts } from '../../actions/posts';

const Create = ({currentId, setCurrentId}) => {
    const navigate = useNavigate();
    const m = moment();

    const [postData, setPostData] = useState({
        haiku_line_1:'',
        haiku_line_2:'',
        haiku_line_3:'',
        createdAt:m.format('L HH:mm')
    });
    const [syllables, syllableCount] = useState({
        syllables_line_1:0,
        syllables_line_2:0,
        syllables_line_3:0
    });

    const dispatch = useDispatch();

    const userPost = useSelector((state)=> currentId ? state.userPostReducers.find((p)=>p._id===currentId):null );

    const { register, handleSubmit, formState:{errors} } = useForm({
        defaultValues:userPost
    })

    useEffect(()=>{
        if (userPost){
            setPostData(userPost);
            syllableCount({
                syllables_line_1:5,
                syllables_line_2:7,
                syllables_line_3:5  
            })
        }
    },[userPost])

    const clear = () => {
        setCurrentId(null);
        setPostData({
            haiku_line_1:'',
            haiku_line_2:'',
            haiku_line_3:''
        })
    }

    const onSubmit = () =>{
        if(currentId){
            dispatch(updatePosts(currentId,postData))
            navigate('/profile');
            clear();
        }else{
            dispatch(createPosts(postData));
            navigate('/');
        }
    }

    return (
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
            <div className='mt-4'>
                <div className='flex justify-center py-4 color-fit'>
                    <label className='inline-block mt-2 text-3xl uppercase'>
                        {currentId ? 'Redeem yourself' : 'Whip up a Haiku'}
                    </label>
                </div>
                <div>
                    <div className='flex mt-4'>
                        <input name='haiku_line_1'
                            {...register('haiku_line_1',{
                                required:{value:true,message:'This field is required'},
                                validate:value=>syllable(value)===5
                            })} 
                            value={postData.haiku_line_1} 
                            onChange={e=>{setPostData({...postData,haiku_line_1:e.target.value});syllableCount({...syllables,syllables_line_1:syllable(postData.haiku_line_1)})}}
                            placeholder='An old silent pond' 
                            className='block w-80 focus:border-violet-900 placeholder-slate-100 flex-1 border-b-2 border-gray-400 outline-none'
                        />
                        <label className='pl-2 font-biorhyme text-2xl font-extrabold'>
                            ,
                        </label>
                    </div>
                    <div className='text-red-700'>
                        {errors?.haiku_line_1?.message}
                        {errors.haiku_line_1?.type==='validate' && 'This line should have 5 syllables'}
                    </div>
                    <div className='flex'>
                        <input  name='haiku_line_2' 
                            {...register('haiku_line_2',{
                                required:{value:true,message:'This field is required'},
                                validate:value=>syllable(value)===7
                            })}
                            defavalue={postData.haiku_line_2} 
                            placeholder='A frog jumps into the pond'
                            onChange={e=>{setPostData({...postData,haiku_line_2:e.target.value});syllableCount({...syllables,syllables_line_2:syllable(postData.haiku_line_2)})}}
                            className='block w-80 focus:border-violet-900 placeholder-slate-100 flex-1 border-b-2 border-gray-400 outline-none'
                        />
                        <label className='block pl-2 font-biorhyme text-2xl font-extrabold'>
                            ,
                        </label>
                    </div>
                    <div className='text-red-700'>
                        {errors?.haiku_line_2?.message}
                        {errors.haiku_line_2?.type==='validate' && 'This line should have 7 syllables'}
                    </div>
                    <div className='mt-1'>
                        <input  name='haiku_line_3' 
                            {...register('haiku_line_3',{
                                required:{value:true,message:'This field is required'},
                                validate:value=>syllable(value)===5
                            })}
                            value={postData.haiku_line_3} 
                            placeholder='"splash!" Silence again'
                            onChange={e=>{setPostData({...postData,haiku_line_3:e.target.value});syllableCount({...syllables,syllables_line_3:syllable(postData.haiku_line_3)})}}
                            className='block w-80 focus:border-violet-900 placeholder-slate-100 flex-1 border-b-2 border-gray-400 outline-none'
                        />
                    </div>
                    <div className='text-red-700'>
                        {errors?.haiku_line_3?.message}
                        {errors.haiku_line_3?.type==='validate' && 'This line should have 5 syllables'}    
                    </div>
                </div>
                <div className='flex justify-center font-nunito my-8 tracking-widest'>
                    <div>{syllable(postData.haiku_line_1)}-{syllable(postData.haiku_line_2)}-{syllable(postData.haiku_line_3)}</div>
                </div>
                <div className='flex justify-center'>
                    <button type="submit"
                        className='border-color-fit hover:bg-violet-900 hover:border-0 hover:text-white border color-fit 
                        font-bold text-sm cursor-pointer text-center py-2 px-6 rounded'
                    >
                        POST
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Create;