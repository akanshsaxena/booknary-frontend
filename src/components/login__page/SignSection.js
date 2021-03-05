import React, { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function SignSection() {
  const [isChecked, setIsChecked] = useState(true);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div id="sign__section">
      <div>
        <h3> {isChecked ? "Sign In" : "Sign Up"} </h3>
      </div>
      <div className="form__container">
        {isChecked ? <SignIn /> : <SignUp />}
      </div>
      <div>
        <p> {isChecked ? "Are you a new user?" : "Already a user?"} </p>
        <label id="checkbox__label">
          {!isChecked ? "Sign In" : "Sign Up"}
          <input
            id="checkbox"
            type="checkbox"
            value={isChecked}
            onClick={handleClick}
          />
        </label>
      </div>
    </div>
  );
}
