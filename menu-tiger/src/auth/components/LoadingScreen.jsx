import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 4000); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <img
        src="https://www.app.menutigr.com/static/media/loading-menu.e4f2f52fea36a23ed1c7.gif"
        alt="Loading..."
        className="w-32 h-32"
      />
    </div>
  );
};

export default LoadingScreen;
