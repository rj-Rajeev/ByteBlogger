import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";

const Post = () => {
  const [post, setPost] = useState();
  const {slug} = useParams();
  const navigate = useNavigate();

  const curruntUser = useSelector((state)=>state.auth.userData);
  const isAuthor = post && curruntUser ? post.userId===curruntUser.$id : false;

  useEffect(()=>{
    if(slug){
      databaseService.getPost(slug).then((post)=>{
        if (post) {
          setPost(post);
        }
        else{ navigate("/errorPage")}
      });
    }else navigate("/");
  },[slug,navigate]);





  return (
    <>
    <div className="hero w-full min-h-screen p-10">
        <div className="poster w-full flex items-center justify-center ">
          <img src={post?storageService.getFilePreview(post.featuredImage) : ""}  alt={post?post.title: ""} className=" w-4/5"/>
        </div>
        {isAuthor?(<div className="btn">
          <Link to={{
                  pathname: "/addPost",
                  state: { post }, 
                }} className="p-3 rounded-lg bg-slate-800 m-2 text-white active:scale-105">EditPost</Link>
          <button className="p-3 rounded-lg bg-slate-800 m-2 text-white active:scale-105">Delete Post</button>
        </div>):(<></>)}
        <hr />
        <h1 className=" font-extrabold text-2xl my-2 mx-4">{post? post.title:slug} </h1>
        <p className="text-justify">{post?post.content:""}</p>
    </div>
    </>
  )
};

export default Post;
