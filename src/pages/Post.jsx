import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { Query } from "appwrite";
import PostCard from "../components/PostCard";
import Loading from "./Loading";

const Post = () => {
  const [post, setPost] = useState();
  const [posts, setPosts] = useState([]);
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
          const postsData = await databaseService.getPosts();
          setPosts(postsData.documents);
        } catch (error) {
          console.log("Error fetching posts:", error);
        }
      };
  
      fetchPosts();
    }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const queries = [Query.equal("slug", slug)];
        const postsData = await databaseService.getPosts(queries);
        setPost(postsData.documents[0]);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPost();
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

  return loading ? <Loading/>:(
    <>
      <div className="hero w-full h-full pt-32 flex">
        <div className="hero w-3/4 min-h-screen p-10">
          <div className="poster w-full flex items-center justify-center ">
            {post && post.featuredImage !== "" ? (
              <img
                src={
                  post ? storageService.getFilePreview(post.featuredImage) : ""
                }
                alt={post ? post.title : ""}
                className=" w-4/5"
              />
            ) : (
              ""
            )}
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
          <p
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: post ? post.content : "" }}
          />
        </div>
        <div className="featured m-10 pt-4 h-3/5 overflow-auto fixed right-14 hide-scrollbar  border-b-2 border-black">
        <p className="  z-50 fixed -mt-4 bg-white w-48 border-b-2 border-black">More content</p>
        {posts.length!==0?(
          posts.map((post) => (
            <div key={post.$id}>
              <PostCard post={post} className={`m-2`}/>
            </div>
          ))
        ):(<h1 className=" text-center w-full font-extrabold text-4xl">There are no posts available.</h1>)}
        </div>
      </div>
    </>
  );
};

export default Post;
