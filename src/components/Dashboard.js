import React from "react";

import Main_Header from "./dashboard__page/Main_Header";
import Section from "./dashboard__page/Section";

export default function Dashboard() {
  return (
    <>
      <Main_Header />
      <Section category="all" heading="All" />
    </>
  );
}
