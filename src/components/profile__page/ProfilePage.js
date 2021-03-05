import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ProfilePage() {
  const [decoded, setDecoded] = useState({
    _id: "",
    email: "",
    name: "",
  });
  const [user, setUser] = useState({ _id: "", email: "", name: "" });
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("user");
    const decode = jwt.decode(token, {
      complete: true,
    });
    if (decode) {
      setDecoded(decode.payload);
      console.log(decode.payload);
      getUserDetails(decode.payload);
    } else {
      history.push("/");
    }
  }, []);

  const getUserDetails = async (decoded) => {
    const response = await axios.get(
      `https://booknary-backend.herokuapp.com/api/account/user/get?authorId=${decoded._id}`
    );
    const data = await response.data;
    setUser({
      ...decoded,
    });
  };
  return (
    <div className="profile_page">
      <div>
        <div className="img_div">
          <img src="https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png" />
          <h1>{user.name}</h1>
        </div>
      </div>
    </div>
  );
}
