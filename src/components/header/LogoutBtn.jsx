import React from "react";
import authService from "../../appwrite/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authSlice";
import { useNavigate } from "react-router-dom";


const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        localStorage.removeItem("userData");
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-black border p-1 px-2 rounded-xl active:scale-105"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
