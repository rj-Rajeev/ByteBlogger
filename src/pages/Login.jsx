import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../services/authSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFormSubmit = async (data) => {
    try {
      setError("");
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          localStorage.setItem("userData", JSON.stringify(userData));
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <div className="main w-full h-[90vh] pt-32 flex flex-col items-center justify-center">
        <h1 className="font-extrabold p-2">Login Here</h1>
        <form
          onSubmit={handleSubmit(loginFormSubmit)}
          className="border-2 rounded-lg p-2 border-black flex flex-col items-center"
        >
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            placeholder="Enter Your Email Id"
            className="block border p-2 m-2 w-full "
          />
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            id="password"
            placeholder="Enter Your password"
            className="block border p-2 m-2 w-full "
          />
          {errors.password && (
            <p className=" text-xs text-red-600">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="bg-black text-white rounded-lg py-1 w-full active:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-sm">
          not registerd?{" "}
          <Link to={"/Signup"} className="text-blue text-cyan-400">
            Create Account
          </Link>
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </>
  );
}

export default Login;
