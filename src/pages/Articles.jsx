import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/databaseService";
import PostCard from "../components/PostCard";
import Loading from "./Loading";
function Articles() {
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

  return (
    <>
      {loading?(<Loading/>):(
      <div className="main w-full min-h-[70vh]">
      <div className="content w-full h-fit flex gap-1 flex-wrap">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
      </div>
      )}
    </>
  );
}

export default Articles;
