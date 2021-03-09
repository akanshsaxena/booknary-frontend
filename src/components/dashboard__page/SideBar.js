import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar(props) {
  const cross = useRef(null);
  const menu = useRef(null);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
  };
  const closeMenu = (e) => {
    e.preventDefault();
    menu.current.style.display = "none";
  };
  return (
    <div ref={menu} className="side-menu">
      <div ref={cross} onClick={closeMenu} id="burger">
        <img id="menu-img-close" src="/images/close.svg"></img>
      </div>
      <p>
        <NavLink className="menu-link" to="/write">
          Write
        </NavLink>
      </p>
      <p onClick={handleLogout}>
        <NavLink className="menu-link" to="/">
          Logout
        </NavLink>
      </p>
    </div>
  );
}
