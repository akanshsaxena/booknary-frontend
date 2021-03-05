import React from "react";

export default function LowerSection(props) {
  const { scrollTo } = props;
  return (
    <div id="lower__section">
      <h1>
        <span> All here a</span>t one place
      </h1>
      <i
        onClick={scrollTo}
        className="fas fa-arrow-alt-circle-down"
        id="arrow"
        style={{
          fontSize: "55px",
          color: "#226602",
          marginTop: "30px",
        }}
      />
    </div>
  );
}
