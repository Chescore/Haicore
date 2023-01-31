import axios from 'axios';

const URL = 'https://haicore.up.railway.app';

export const fetchPosts = () => axios.get(URL);
export const fetchUsersPosts = () => axios.get(`${URL}/userPosts`);
export const createPosts = (newPost) => axios.post(URL, newPost);
export const updatePosts = (id,updatedPost) => axios.patch(`${URL}/userPosts/${id}`,updatedPost);
export const deletePosts = (id) => axios.delete(`${URL}/userPosts/${id}`)