export const postReducers = (posts=[],action)=>{
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;    
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}

export const userPostReducers = (userPosts=[],action)=>{
    switch(action.type){
        case 'FETCH':
            return action.payload;
        case 'UPDATE':
            return  userPosts.map((post)=>post._id===action.payload._id ? action.payload : post);
        case 'DELETE':
            return userPosts.filter((post)=>post._id!==action.payload);
        default:
            return userPosts;
    }
}