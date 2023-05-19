import React, { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import AuthContext from '../../hoc/AuthContext/auth';
import { getPosts } from '../../actions/posts';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch])

    const {loggedIn} = useContext(AuthContext);

    const posts = useSelector((state)=>state.postReducers);

    const showPosts = () =>{
        return posts.map((post,i)=>{
            return(
                <div key={i} className='flex bg-white justify-center mx-2 my-1 px-2 py-4 shadow'>
                    <div className='inline-block p-4'>
                        <div className='text-violet-900 text-center'>
                            {post.postedBy}
                        </div>
                        <div className='text-center py-2'>
                            <div>{post.haiku_line_1},</div>
                            <div>{post.haiku_line_2},</div>
                            <div>{post.haiku_line_3}</div>
                        </div>
                        <div className='text-slate-400 py-2 text-sm text-center' >{post.createdAt}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className='flex justify-center bg-color-fit color-fit'>
                <div className='p-16'>
                    <div className='text-5xl font-biorhyme text-center py-4'>Haicore</div>
                    <div className='text-xl text-center'>The Official Haiku</div>
                    <div className='text-xl text-center'>Website</div>
                    <div className='mt-3 text-center'>Haiku - An unrhymed Japanese poem,</div>
                    <div className='text-center'>consisting of 17 syllables in three lines,</div>
                    <div className='text-center'>containing five, seven and five syllables.</div>
                    {loggedIn===true&&(
                        <>
                            <Link to='/create'>
                                <div className='flex my-8 justify-center text-white bg-color-fit-2 hover:bg-violet-800 
                                                font-spectral font-light text-sm cursor-pointer py-2 px-4 
                                                uppercase'>
                                                    Start writing
                                </div>
                            </Link>
                        </>
                    )} 
                    {loggedIn===false&&(
                        <>
                            <Link to='/login'>
                                <div className='flex my-8 justify-center text-white bg-color-fit-2 hover:bg-violet-800
                                                font-spectral font-light text-sm cursor-pointer text-center py-2 px-4 
                                                uppercase'>
                                                    Start writing
                                </div>
                            </Link>
                        </>
                    )}    
                </div>
            </div>
            <div className='flex flex-col-reverse bg-slate-100'>
                {showPosts()}
            </div>
        </div>
    );
};

export default Home;