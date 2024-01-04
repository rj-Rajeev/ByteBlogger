import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/databaseService";
import PostCard from "../components/PostCard";
import Loading from "./Loading";
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await databaseService.getPosts();
        setPosts(postsData.documents);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return loading?(<Loading/>):(
    (
      <>
        <div className="banner w-full h-[70vh] relative">
          <img
            src="public/banner01.jpg"
            alt=""
            className="w-full h-full object-cover object-left"
          />
          <h1 className=" absolute top-1/2 left-[8vw] font-extrabold text-2xl shadow-xl ">ByteBlogger</h1>
          <p className=" absolute top-[15vw] left-[8vw] font-bold ">Read, Post and Achive your Goal ... 👒</p>
        </div>
        <div className="content w-full h-fit flex gap-1 flex-wrap">
          {posts.length!==0?(
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard post={post} />
              </div>
            ))
          ):(<h1 className=" text-center w-full font-extrabold text-4xl">There are no posts available.</h1>)}
        </div>
      </>
    )
  )
}

export default Home;
