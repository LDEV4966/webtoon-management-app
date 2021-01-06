import React from "react";
const Loading = () => {
  return (
    <div class="circular">
      <div class="inner"></div>
      <div class="inner__text">Loading</div>
      <div class="circle">
        <div class="bar left">
          <div class="progress"></div>
        </div>
        <div class="bar right">
          <div class="progress"></div>
        </div>
      </div>
    </div>
  );
};
export default Loading;
