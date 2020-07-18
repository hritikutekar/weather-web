import React from "react";

const HumidityCard = ({ humidity }) => {
  return (
    <div className='highlight_card'>
      <p className='highlight_title'>Humidity</p>
      <div className='highlight_value' style={{ alignItems: "flex-start" }}>
        <h1 className='value'>{humidity}</h1>
        <p className='unit' style={{ fontWeight: "bold", marginTop: "6px" }}>
          %
        </p>
      </div>
      <div className='circular_progress_container'>
        <div
          style={{
            width: "calc(100% - 31.5px)",
            position: "relative",
          }}
        >
          <div className='circular_progress' style={{ left: `${humidity}%` }} />
        </div>
      </div>
    </div>
  );
};

export default HumidityCard;
