import React from "react";
import { Element } from "react-scroll";

import SignSection from "./login__page/SignSection";

export default function AccessPage(props) {
  const { accessPage } = props;
  return (
    <>
      <Element name={accessPage}>
        <div name={accessPage} id={accessPage}>
          <div className="container">
            <div id="caraosel"> </div> <SignSection />
          </div>
        </div>
      </Element>
    </>
  );
}
