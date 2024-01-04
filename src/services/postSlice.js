import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers : {
        createPost : (state, action)=>{
            state.posts = [...state.posts ,action.payload]
        },
        updatePost : (state, action)=>{
            const {$Id} = action.payload
            const postIndex = state.posts.findIndex((post)=>post.$Id===$Id);
            if (postIndex !== -1) {
                state.posts[postIndex] = action.payload
            }
        },
        deletePost : (state, action)=>{
            const {$Id} = action.payload
            state.posts = state.posts.filter((post)=>post.$Id!==$Id)
        }
    }
})

export const {createPost, updatePost, deletePost} = postSlice.actions;
export default postSlice.reducer;