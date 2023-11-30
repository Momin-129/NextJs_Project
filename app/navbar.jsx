import React from "react";
import Session from "./user/session";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-3xl">Cycle</a>
      </div>
      <div className="navbar-end">
        <Session />
      </div>
    </div>
  );
};

export default Navbar;
