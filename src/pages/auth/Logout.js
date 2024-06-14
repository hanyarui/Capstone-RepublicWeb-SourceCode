import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { IoLogOutOutline } from "react-icons/io5";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("token");

    // Redirect to login page
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      <IoLogOutOutline className="size-9" />
    </button>
  );
};

export default Logout;
