import React from "react";

const ErrorMessages = ({ text }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  );
};

export default ErrorMessages;
