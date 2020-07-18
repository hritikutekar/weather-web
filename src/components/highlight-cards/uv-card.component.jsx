import React from "react";

import SemiCircleProgress from "../semicircle-progress.component";

const UvCard = ({ uvi }) => {
  return (
    <div className='highlight_card'>
      <p className='highlight_title'>UV Index</p>
      <div
        className='highlight_value'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <SemiCircleProgress percentage={uvi} showPercentValue />
      </div>
    </div>
  );
};

export default UvCard;
