import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <>
      <div className="profile items-center justify-center w-full h-[92vh] flex flex-col">
        <h1 className="font-extrabold m-5">Your details:</h1>
        <div className="detsBox border-2 border-black rounded-xl p-10">
          <h4 className="font-bold">
            Name: <span className="font-normal uppercase">{userData?.name}</span>{" "}
          </h4>
          <h4 className="font-bold">
            Email: <span className="font-normal">{userData?.email}</span>{" "}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Profile;
