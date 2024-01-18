import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/databaseService";
import PostCard from "../components/PostCard";
import Loading from "./Loading";
function Articles() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await databaseService.getPosts();
        setPosts(postsData.documents);
        setLoading(false);
      } catch (err) {
        if (err.message.includes("Network")) {
          setError("Please check your connection.📌");
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main w-full min-h-[92vh] bg-slate-400 pt-32">
          <div className="content w-full h-fit flex justify-around flex-wrap p-2">
            {!error ? (
              posts.map((post) => (
                <div key={post.$id}>
                  <PostCard post={post} />
                </div>
              ))
            ) : (
              <h1 className=" text-center w-full font-extrabold text-red-500 text-4xl mt-40">
                {error}
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Articles;
