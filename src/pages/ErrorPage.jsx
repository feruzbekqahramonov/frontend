import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white mb-8">404</h1>
        <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-white mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-white text-indigo-500 font-semibold rounded hover:bg-indigo-100 transition duration-300"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-white text-indigo-500 font-semibold rounded hover:bg-indigo-100 transition duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
