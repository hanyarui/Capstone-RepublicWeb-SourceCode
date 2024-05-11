import "../App.css";
import React, { useState, useEffect } from "react";
import LogoHp from "../components/login/hp/Logo";
import LogoLaptop from "../components/login/laptop/Logo";
import LoginFormHp from "../components/login/hp/LoginFormHp";
import LoginFormLaptop from "../components/login/laptop/LoginFormLaptop";

const LoginPage = () => {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderLoginForm = () => {
    if (screenWidth <= 1080) {
      return (
        <div className="login-page block items-center justify-center h-screen w-screen bg-f5f5f5">
          <LogoHp />
          <LoginFormHp />
        </div>
      );
    } else {
      return (
        <div className="login-page flex items-center justify-center h-screen w-screen bg-f5f5f5">
          <LogoLaptop />
          <LoginFormLaptop />
        </div>
      );
    }
  };

  return <div>{renderLoginForm()}</div>;
};

export default LoginPage;
