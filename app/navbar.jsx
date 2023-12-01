import React from "react";
import LoginButton from "./components/LoginButton";
import UserButtons from "./components/UserButtons";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <UserButtons />
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-3xl">Cycle</a>
      </div>
      <div className="navbar-end">
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
