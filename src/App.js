import React, { useEffect } from "react";
// eslint-disable-next-line
import { animateScroll as scroll, scroller, Events } from "react-scroll";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import AccessPage from "./components/AccessPage";
import Dashboard from "./components/Dashboard";
import Write from "./components/Write";
import ReadPage from "./components/ReadPage";
import Profile from "./components/Profile";
import SeachPage from "./SearchPage";

function App() {
  const accessPage = "accessPage";

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });
  }, []);

  const scrollTo = () => {
    console.log("scrolling");
    scroller.scrollTo(accessPage, {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage scrollTo={scrollTo} />
          <AccessPage accessPage={accessPage} />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/write">
          <Write />
        </Route>
        <Route exact path="/book/:bookId">
          <ReadPage />
        </Route>
        <Route exact path="/search/:search">
          <SeachPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
