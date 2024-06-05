import "../../App.css";
import React, { useState, useEffect } from "react";
import HomepageHp from "../../components/homepage/hp/HomepageHp";
import HomepageLaptop from "../../components/homepage/laptop/HomepageLaptop";

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
          <HomepageHp />
        </div>
      );
    } else {
      return (
        <div className="login-page flex items-center justify-center h-screen w-screen bg-f5f5f5">
          <HomepageLaptop />
        </div>
      );
    }
  };

  return <div>{renderLoginForm()}</div>;
};

export default LoginPage;
