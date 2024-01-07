import React, { useState, useEffect, useRef } from "react";
import databaseService from "../appwrite/databaseService";
import PostCard from "../components/PostCard";
import Loading from "./Loading";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
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

  const postContainerRef = useRef(null);

  const onRight = () => {
    postContainerRef.current.scrollTo({
      left:
        postContainerRef.current.scrollLeft -
        postContainerRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const onLeft = () => {
    postContainerRef.current.scrollTo({
      left:
        postContainerRef.current.scrollLeft +
        postContainerRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="pt-28">
        <div className="banner  w-full h-[75vh] relative bg-[url('/banner01.jpg')] bg-cover bg-center">
          <div className="latest w-1/2 h-64 bg-slate-50 absolute right-0 bottom-2 backdrop-filter backdrop-blur-sm bg-opacity-25">
            <span className=" text-black text-xs font-semibold mx-2">
              Most Recent Posts...
            </span>
            <hr className="opacity-30" />
            <div
              onClick={onLeft}
              className="left-btn w-6 h-6  absolute left-[-10px] bg-black cursor-pointer top-32 text-white rounded-full text-xl font-extrabold flex items-center justify-center z-50 "
            >
              <SlArrowLeftCircle />
            </div>
            <div
              onClick={onRight}
              className="right-btn w-6 h-6  absolute right-0 bg-black cursor-pointer top-32 text-white rounded-full text-xl font-extrabold flex items-center justify-center z-50 "
            >
              <SlArrowRightCircle />
            </div>
            <div
              ref={postContainerRef}
              className="posts  w-full h-[90%] flex items-center px-4 overflow-auto hide-scrollbar relative"
            >
              <div className="div flex gap-2 ">
                {posts.length !== 0 ? (
                  posts.map((post) => (
                    <div key={post.$id}>
                      <PostCard post={post} />
                    </div>
                  ))
                ) : (
                  <h1 className=" text-center w-full font-extrabold text-4xl">
                    There are no posts available.
                  </h1>
                )}
              </div>
            </div>
          </div>
          <h1 className=" absolute top-1/2 left-[8vw] font-extrabold text-7xl shadow-xl ">
            ByteBlogger
          </h1>
          <p className=" absolute top-[16vw] left-[8vw] font-bold ">
            Read, Post and Achive your Goal ... 👒
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
