import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const isUser = useSelector((state) => state.auth.status);
  return (
    <>
      <div className="fixed z-50 w-full max-h-fit">
      <header
        className={`w-full h-20 bg-zinc-800 px-10 flex items-center justify-between `}
      >
        <div className="logo">
          <img src="/white.png" alt="" className="w-20" />
        </div>
        <div className="Name hidden text-white text-5xl font-extrabold md:block">
          ByteBlogger
        </div>
        <div className="profile">
          <RiAccountCircleLine
            onClick={() => {
              !isUser ? navigate("/Login") : navigate("/profile");
            }}
            className="text-white w-8 h-8 cursor-pointer"
          />
        </div>
      </header>
      <Nav />
      </div>
    </>
  );
};

export default Header;
