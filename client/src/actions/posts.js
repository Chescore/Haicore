import * as api from '../api/index';

export const getPosts = () =>async (dispatch) => { 
    try{
        const { data } = await api.fetchPosts();
        const action = { type: 'FETCH_ALL', payload: data};
        dispatch(action);
    }catch(error){
        console.log(error.message)
    }
}

export const getUsersPosts = () => async (dispatch)=>{
    try{
        const { data } = await api.fetchUsersPosts();
        const action = { type: 'FETCH', payload: data};
        dispatch(action);
    }catch(err){
        console.log(err.message)
    }
}

export const createPosts = (post) => async(dispatch)=>{
    try{
        const { data } = await api.createPosts(post);
        const action = {type: 'CREATE', payload: data};
        dispatch(action);
    }catch(error){
        console.log(error.message);
    }
}

export const updatePosts = (id,post) => async(dispatch) =>{
    try{
        const {data} = await api.updatePosts(id,post);
        const action = {type: 'UPDATE', payload: data};
        dispatch(action);
    }catch(error){
        console.log(error.message)
    }
}

export const deletePosts = (id) => async(dispatch) => {
    try {
        await api.deletePosts(id);
        const action = {type: 'DELETE', payload: id};
        dispatch(action)
    } catch (error) {
        
    }
}