import React from "react";
const Loading = () => {
  return (
    <div className="circular">
      <div className="inner"></div>
      <div className="inner__text">Loading</div>
      <div className="circle">
        <div className="bar left">
          <div className="progress"></div>
        </div>
        <div className="bar right">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
