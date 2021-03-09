import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Main_Header() {
  const [search, setSearch] = useState("");
  const cross = useRef(null);
  const menu = useRef(null);
  const burger = useRef(null);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
  };
  const closeMenu = (e) => {
    e.preventDefault();
    menu.current.style.display = "none";
  };
  const openMenu = (e) => {
    e.preventDefault();
    menu.current.style.display = "block";
  };
  return (
    <>
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
      <div className="main_header">
        <div id="main-header-container">
          <div id="burger-div">
            <NavLink className="link" to="/dashboard">
              <h1> Booknary </h1>
            </NavLink>
            <div ref={burger} onClick={openMenu} id="burger">
              <img id="menu-img" src="/images/square.svg"></img>
            </div>
          </div>
          <div id="search">
            <input
              value={search}
              onChange={handleChange}
              type="text"
              placeholder="Search a fellow writer or a book"
            />
            <NavLink id="search-btn" to={`/search/${search}`}>
              {" "}
              🔎{" "}
            </NavLink>
          </div>
          <div id="nav_bar">
            {/* <p>
              <NavLink className="link" to="/profile">
                Profile
              </NavLink>
            </p> */}
            <p>
              <NavLink className="link" to="/write">
                Write
              </NavLink>
            </p>
            <p onClick={handleLogout}>
              <NavLink className="link" to="/">
                Logout
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
