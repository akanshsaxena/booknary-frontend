import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setIsMandatory(true);
    } else {
      try {
        const response = await axios.post(
          "https://booknary-backend.herokuapp.com/api/account/user/login/",
          {
            email: email,
            password: password,
          }
        );

        const data = await response.data;
        if (response.headers["content-length"] != 38) {
          localStorage.setItem("user", response.data);
          history.push("/dashboard");
        } else {
          setIsError(true);
          setErrorMessage(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="form">
      <form>
        <label className="label">
          Email Id{" "}
          <input
            type="email"
            placeholder="johndoe@doe.com"
            value={email}
            onChange={handleChange}
          />{" "}
        </label>{" "}
        <br />
        <label className="label">
          Password{" "}
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChange}
          />{" "}
        </label>{" "}
        <br />
        <button onClick={handleClick} className="btn1">
          Sign In{" "}
        </button>{" "}
      </form>{" "}
      {isMandatory && (
        <p
          style={{
            color: "red",
            fontSize: "0.65rem",
            marginTop: "5px",
          }}
        >
          All fields are mandatory{" "}
        </p>
      )}{" "}
      {isError && (
        <p style={{ color: "red", fontSize: "0.65rem", marginTop: "5px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
