import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Nav() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navLinks = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Articles",
      url: "/Articles",
      active: true,
    },
    {
      name: "Login",
      url: "/Login",
      active: !isAuthenticated,
    },
    {
      name: "CreatePost",
      url: "/newPost",
      active: isAuthenticated,
    },
  ];
  return (
    <>
      <nav className="bg-black text-white font-semibold">
        <ul className="h-10 flex items-center justify-center gap-10">
          {navLinks.map((Item) =>
            Item.active ? (
              <li key={Item.name}>
                <NavLink
                  to={Item.url}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "underline" : ""
                  }
                >
                  {Item.name}
                </NavLink>
              </li>
            ) : null,
          )}

          <li>{isAuthenticated && <LogoutBtn />}</li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
