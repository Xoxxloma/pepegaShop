import React from "react";

export const Loader = () => (
  <div className="text-center mt-5">
    <div className="spinner-border" role="status" style={{ width: "6rem", height: "6rem" }}>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
