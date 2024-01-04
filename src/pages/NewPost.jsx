import React,{useState} from "react";
import RTE from "../components/RTE";
import { set, useForm } from "react-hook-form";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePost } from "../services/postSlice";
import Loading from "./Loading";

const NewPost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  const { state } = useLocation();
  const post = state && state.post;

  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "public",
      },
    });

  const userId = useSelector((state) =>
    state.auth.userData ? state.auth.userData.$id : ""
  );

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    if (post) {
      try {
       let featuredImage = post.featuredImage;
      const newFile = data.file[0];
      const updatedFile = await storageService.updateFile({
        featuredImage,
        newFile,
      });
      featuredImage = updatedFile.$id;

      if (updatedFile) {
        const updatedPost = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage,
        });
        if (updatedPost) {
          dispatch(updatePost(updatedPost))
          navigate(`/post/${updatedPost.slug}`);
        }
      }
      } catch (error) {
        
        console.log(error);
      }
     
    } else {
      setLoading(true);
      let featuredImage = "";
      const slug = data.title;
      if (data.file) {
        const file = data.file[0]
          ? await storageService.uploadFile(data.file[0])
          : null;
        featuredImage = file?file.$id:"";
      }
      const Newpost = await databaseService.createPost({
        ...data,
        featuredImage,
        slug,
        userId,
      });
      if (Newpost) {
        dispatch(updatePost(Newpost))
        navigate(`/post/${Newpost.slug}`);
        setLoading(false);
      }
    }
  };

  return loading?(<Loading/>):(
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="wrapper flex w-full  p-10"
      >
        <div className="editor w-3/4 h-full">
          <RTE
            control={control}
            name={"content"}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="options w-1/4  bg-slate-600 p-2">
          <h1 className="text-center font-bold text-2xl text-white">
            {post?"Update Post":"Add New Post"}
          </h1>
          <label
            htmlFor="title"
            className="block text-lg text-white font-semibold"
          >
            Title:
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            id="title"
            className="w-full h-10 p-2 focus:outline-none font-bold"
          />

          <label
            htmlFor="file"
            className="block text-lg text-white font-semibold mt-2"
          >
            ADD Files:
          </label>
          <input
            {...register("file", { required: post?false:false })}
            type="file"
            id="file"
            className="w-full h-10 p-2 focus:outline-none text-white font-bold"
          />

          <label
            htmlFor="status"
            className="block text-lg text-white font-semibold mt-2"
          >
            Status:
          </label>
          <select
            {...register("status", { required: true })}
            id="status"
            className="w-full p-2 font-semibold"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <button
            type="submit"
            className=" mt-5 text-center w-full p-2 border border-white font-bold text-white active:scale-105"
          >
            {post ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPost;
