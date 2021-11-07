import React, { useState } from "react";

export const Box = ({ message }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="card bg-success">
      <div className="card-header">
        Click Hidden{" "}
        <span
          onClick={() => setHidden(!hidden)}
          className={!hidden ? "fa fa-minus" : "fa fa-plus"}
          style={{ cursor: "pointer" }}
        ></span>
      </div>
      <div className="card-body">
        <h5
          className="card-title"
          style={{ display: hidden ? "none" : "block" }}
        >
          {message}
        </h5>
      </div>
    </div>
  );
};
