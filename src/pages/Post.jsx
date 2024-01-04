import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { Query } from "appwrite";

const Post = () => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  const curruntUser = useSelector((state) => state.auth.userData);
  const isAuthor =
    post && curruntUser ? post.userId === curruntUser.$id : false;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const queries = [Query.equal("slug", slug)];
        const postsData = await databaseService.getPosts(queries);
        setPost(postsData.documents[0]);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [slug]);

  const deletePostHandler = () => {
    setLoading(true);
    storageService
      .deleteFile(post.featuredImage)
      .then(() => {
        databaseService.deletePost(post.$id);
      })
      .then(() => {
        navigate("/");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="hero w-full min-h-screen p-10">
        <div className="poster w-full flex items-center justify-center ">
          {post && post.featuredImage !== "" ? (<img
            src={post ? storageService.getFilePreview(post.featuredImage) : ""}
            alt={post ? post.title : ""}
            className=" w-4/5"
          />):("")}
        </div>
        {isAuthor ? (
          <div className="btn">
            <button
              onClick={() => navigate("/newPost", { state: { post } })}
              className="p-3 rounded-lg bg-slate-800 m-2 text-white active:scale-105"
            >
              EditPost
            </button>
            <button
              onClick={deletePostHandler}
              className="p-3 rounded-lg bg-slate-800 m-2 text-white active:scale-105"
            >
              Delete Post
            </button>
          </div>
        ) : (
          <></>
        )}
        <hr />
        <h1 className=" font-extrabold text-2xl my-2 mx-4">
          {post ? post.title : ""}{" "}
        </h1>
        <p className="text-justify"dangerouslySetInnerHTML={{__html: post ? post.content : ""}}/>
      </div>
      <div>Jay shree ram</div>
    </>
  );
};

export default Post;
