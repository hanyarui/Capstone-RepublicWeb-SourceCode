import "../../App.css";
import React, { useState, useEffect } from "react";
import HistoryLogActivityHp from "../../components/homepage/hp/HistoryLogActivityHp";
import HistoryLogActivityLaptop from "../../components/homepage/laptop/HistoryLogActivityLaptop";

const Homepage = () => {
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
          <HistoryLogActivityHp />
        </div>
      );
    } else {
      return (
        <div className="login-page flex items-center justify-center h-screen w-screen bg-f5f5f5">
          <HistoryLogActivityLaptop />
        </div>
      );
    }
  };

  return <div>{renderLoginForm()}</div>;
};

export default Homepage;
