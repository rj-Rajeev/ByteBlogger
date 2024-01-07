import React from "react";
import storageService from '../appwrite/storageService'
import { useNavigate } from "react-router-dom";

const PostCard = ({post,className}) => {
  const navigate = useNavigate()
  const onread = ()=>{
    navigate(`/post/${post.slug}`)
  }
  return (
    <>
      <div onClick={onread} className={`card cursor-pointer w-44 h-52 m-1 bg-white overflow-hidden relative object-cover object-center shadow-xl hover:shadow-inner ${className}`}>
        {post && post.featuredImage !==""?(<img src={post?storageService.getFilePreview(post.featuredImage) : ""}  alt={post?post.title: ""} className="w-full h-3/6 fit " />):("")}
        <h4 className=" text-left font-bold text-base m-1">{post?post.title: ""}</h4>
      </div>
    </>
  );
};

export default PostCard;
