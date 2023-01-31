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
                <div key={i} className='flex justify-end even:justify-start px-2 py-4'>
                    <div className='inline-block shadow-2xl p-4 bg-gradient-to-tr from-cyan-200 to-blue-500'>
                        <div className='text-sky-700 font-spectral tracking-widest border-b-2 border-slate-400 text-sm'>
                            {post.postedBy}
                        </div>
                        <div className='text-xl'>
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
            <div className='flex justify-center font-cormorantMedium text-slate-900 bg-bgImage bg-contain'>
                <div className='p-16'>
                    <div className='text-4xl tracking-widest'>Nature's calling</div>
                    <div className='py-4 text-xl flex justify-center'>Compose some Haiku today and show it off.</div>
                    <div className='text-xl flex justify-center'>Haiku - An unrhymed Japanese poem</div>
                    <div className='text-xl flex justify-center'>consisting of 17 syllables in three lines</div>
                    <div className='text-xl flex justify-center'>containing five, seven and five syllables</div>
                    {loggedIn===true&&(
                        <>
                            <Link to='/create'>
                                <div className='flex my-8 justify-center border-sky-900 hover:bg-sky-900 hover:text-slate-200 border-2 text-sky-900 font-spectral active:bg-slate-700 font-bold text-sm cursor-pointer text-center py-2 px-4 rounded-full uppercase'>Start writing</div>
                            </Link>
                        </>
                    )} 
                    {loggedIn===false&&(
                        <>
                            <Link to='/login'>
                                <div className='flex my-8 justify-center border-sky-900 hover:bg-sky-900 hover:text-slate-200 border-2 text-sky-900 font-spectral active:bg-slate-700 font-bold text-sm cursor-pointer text-center py-2 px-4 rounded-full uppercase'>Start writing</div>
                            </Link>
                        </>
                    )}    
                </div>
            </div>
            <div className='flex flex-col-reverse'>
                {showPosts()}
            </div>
        </div>
    );
};

export default Home;