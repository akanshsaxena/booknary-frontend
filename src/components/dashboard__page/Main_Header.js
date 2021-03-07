import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Main_Header() {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
  };
  return (
    <div>
      <div className="main_header">
        <div id="main-header-container">
          <NavLink className="link" to="/dashboard">
            <h1> Booknary </h1>
          </NavLink>
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
    </div>
  );
}
