import React, { useState } from "react";
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
  
  const [filePreview, setFilePreview] = useState(post && storageService.getFilePreview(post.featuredImage));
  



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
        if (newFile) {
          const deleteOldFile = await storageService.deleteFile(featuredImage);
          if (deleteOldFile) {
            const uploadNewFile = await storageService.uploadFile(newFile)
            featuredImage = uploadNewFile ? uploadNewFile.$id : "";
          }
        }
        if (post) {
          const updatedPost = await databaseService.updatePost(post.$id, {
            ...data,
            featuredImage,
          });
          if (updatedPost) {
            dispatch(updatePost(updatedPost));
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
      const content = String(data.content);
      if (data.file) {
        const file = data.file[0]
          ? await storageService.uploadFile(data.file[0])
          : null;
        featuredImage = file ? file.$id : "";
      }
      const Newpost = await databaseService.createPost({
        ...data,
        content,
        featuredImage,
        slug,
        userId,
      });
      if (Newpost) {
        dispatch(updatePost(Newpost));
        navigate(`/post/${Newpost.slug}`);
        setLoading(false);
      }
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="wrapper flex w-full pt-32 p-10"
      >
        <div className="editor w-3/4">
          <RTE
            control={control}
            name={"content"}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="options w-1/4  bg-slate-600 p-2">
          <h1 className="text-center font-bold text-xl text-white">
            {post ? "Update Post" : "Add New Post"}
          </h1>
          <hr className=" opacity-40" />
          <label
            htmlFor="title"
            className="block text-white font-medium text-s"
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
            className="block text-white font-medium text-s"
          >
            Add Thumbnil
          </label>
          <input
            {...register("file", { required: post ? false : true })}
            type="file"
            id="file"
            className="w-full h-10 focus:outline-none text-white font-bold"
            onChange={onFileChange}

          />
          {filePreview && (
            <div className="post bg-red-300 w-64 h-36 m-auto object-cover object-center overflow-hidden ">
              <img src={filePreview} alt="File Preview" className=" w-full" />
            </div>
          )}

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
