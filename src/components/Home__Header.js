import React from "react";

export default function Home__Header(props) {
  const { scrollTo } = props;
  return (
    <div className="header">
      <div>
        <h2 id="logo"> Booknary </h2>
        <button onClick={scrollTo} className="btn">
          Sign In
        </button>
      </div>
    </div>
  );
}
