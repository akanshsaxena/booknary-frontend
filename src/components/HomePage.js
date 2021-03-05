import React from "react";
import Home__Header from "./Home__Header";
import MiddleSection from "./home__page/MiddleSection";
import LowerSection from "./home__page/LowerSection";

export default function HomePage(props) {
  const { scrollTo } = props;
  return (
    <div id="home">
      <Home__Header scrollTo={scrollTo} />
      <MiddleSection />
      <LowerSection scrollTo={scrollTo} />{" "}
    </div>
  );
}
