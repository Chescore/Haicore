import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePosts, getUsersPosts } from '../../actions/posts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
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
                <div key={i} className='flex justify-center m-2 px-2 py-4'>
                    <div className='inline-block w-96 px-6 py-8 bg-color-fit shadow'>
                        <div className='flex justify-end border-b border-slate-400 text-base'>
                            <Link to='/create'>
                                <button className='px-3 cursor-pointer'
                                        onClick={()=>setCurrentId(post._id)}>
                                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                </button>
                            </Link>
                            <button className='px-3 hover:text-slate-700 cursor-pointer' onClick={()=>deletePost(post._id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                        </div>
                        <div className='text-center py-2'>
                            <div>{post.haiku_line_1},</div>
                            <div>{post.haiku_line_2},</div>
                            <div>{post.haiku_line_3}</div>
                        </div>
                        <div className='text-slate-400 text-sm text-center' >{post.createdAt}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='color-fit'>
            <div className='font-cormorantMedium tracking-wider border-slate-300 py-4'>
                <div className='flex justify-center py-2 my-2'>
                    <div className='uppercase text-4xl'>{username[0]?<>{username[0]}</>:<>No posts yet</>}</div>
                </div>
            </div>
            <div className='flex flex-col-reverse'>{showProfile()}</div>
        </div>
    );
};

export default Profile;