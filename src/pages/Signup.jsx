import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../services/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAccount = async (data) => {
    setErr("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          // console.log(userData);
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  return (
    <>
      <div className="main w-full h-[70vh] flex flex-col items-center justify-center">
        <h1 className="font-extrabold p-2">Create New Account</h1>
        <form
          onSubmit={handleSubmit(createAccount)}
          className="border-2 border-black p-2 flex flex-col rounded-xl"
        >
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter Your Full Name"
            className="border m-1 p-2 rounded-xl "
          />
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="Enter Your Email-Id"
            className="border m-1 p-2 rounded-xl "
          />
          <input
            {...register("password", { required: true })}
            type="text"
            placeholder="Enter Your PassWord"
            className="border m-1 p-2 rounded-xl "
          />
          <button
            type="submit"
            className="w-full text-white bg-black rounded-lg flex items-center justify-center mt-6 h-10 font-extrabold"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm">
          already registerd -{" "}
          <Link to={"/Login"} className="text-blue text-cyan-400">
            Login
          </Link>
        </p>
        <p className="text-sm text-red-600">{err}</p>
      </div>
    </>
  );
};

export default Signup;
