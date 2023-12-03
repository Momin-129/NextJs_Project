import React from "react";
import LoginButton from "./components/LoginButton";
import UserButtons from "./components/UserButtons";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <UserButtons />
      </div>
      <div className="navbar-center">
        <Link href="/user" className="btn btn-ghost text-3xl">
          Cycle
        </Link>
      </div>
      <div className="navbar-end">
        <LoginButton />
      </div>
    </div>
  );
};

export default Navbar;
