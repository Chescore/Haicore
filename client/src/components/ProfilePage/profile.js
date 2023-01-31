import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePosts, getUsersPosts } from '../../actions/posts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faPersonHiking, faSmileBeam, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Profile = ({setCurrentId}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUsersPosts());
    },[dispatch])

    const deletePost = (id) =>{
        dispatch(deletePosts(id));
        window.location.reload();
    }

    const posts = useSelector((state)=>state.userPostReducers)
    const username = posts.map((post)=> post.postedBy)

    const showProfile = () =>{
        return posts.map((post,i)=>{
            return(
                <div key={i} className='flex justify-end even:justify-start px-2 py-4'>
                    <div className='inline-block shadow-2xl p-4 bg-gradient-to-tr from-sky-200 to-cyan-600'>
                        <div className='flex justify-end text-slate-500 font-spectral border-b-2 border-slate-400 text-xs'>
                            <Link to='/create'>
                                <button className='px-3 hover:text-slate-700 cursor-pointer'
                                        onClick={()=>setCurrentId(post._id)}>
                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                </button>
                            </Link>
                            <button className='px-3 hover:text-slate-700 cursor-pointer' onClick={()=>deletePost(post._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                        </div>
                        <div>
                            <div>{post.haiku_line_1},</div>
                            <div>{post.haiku_line_2},</div>
                            <div>{post.haiku_line_3}</div>
                        </div>
                        <div className='text-slate-400 text-sm' >{post.createdAt}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className='font-cormorantMedium tracking-wider border-b-4 border-slate-300 text-sky-900 py-4 text-lg'>
                <div className='flex justify-center pt-2'>
                    <div><FontAwesomeIcon icon={username[0]?faSmileBeam:faPersonHiking} size='2xl'></FontAwesomeIcon></div>
                </div>
                <div className='flex justify-center py-2'>
                    <div className='uppercase'>{username[0]?<>{username[0]}</>:<>Your journey awaits</>}</div>
                </div>
            </div>
            <div className='flex flex-col-reverse'>{showProfile()}</div>
        </div>
    );
};

export default Profile;