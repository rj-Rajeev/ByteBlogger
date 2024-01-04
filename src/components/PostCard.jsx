import React from "react";
import storageService from '../appwrite/storageService'
import { useNavigate } from "react-router-dom";

const PostCard = ({post}) => {
  const navigate = useNavigate()
  const onread = ()=>{
    navigate(`/post/${post.slug}`)
  }
  return (
    <>
      <div className="card w-[250px] h-[300px] border-2 border-black rounded-lg m-1 p-1 overflow-hidden relative object-cover object-center">
        {post && post.featuredImage !==""?(<img src={post?storageService.getFilePreview(post.featuredImage) : ""}  alt={post?post.title: ""} className="w-full h-3/5 fit " />):("")}
        <h4 className="text-center font-bold ">{post?post.title: ""}</h4>
        <p className="m-2 text-justify"dangerouslySetInnerHTML={{__html: post ? post.content : ""}}/>
        <button onClick={onread} className="bg-black rounded-r-xl text-center p-1 text-sm text-white absolute bottom-1 right-1 active:scale-105">
          Read---
        </button>
      </div>
    </>
  );
};

export default PostCard;
