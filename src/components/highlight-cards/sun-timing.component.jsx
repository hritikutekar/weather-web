import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/all";
import { formatTime, compareTime } from "../../utils/utils";

const SunTimingCard = ({ rise, set, sunrise, sunset }) => {
  return (
    <div className='highlight_card'>
      <p className='highlight_title'>Sunrise & Sunset</p>
      <div
        className='highlight_value'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "bold",
          letterSpacing: "1.2px",
        }}
      >
        <div className='sun_icon'>
          <FaArrowUp />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ margin: 0 }}>{formatTime(rise)}</p>
          <p style={{ margin: 0, color: "#A0A0A0" }}>
            {compareTime(rise, sunrise)}
          </p>
        </div>
      </div>
      <div
        className='highlight_value'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "bold",
          letterSpacing: "1.2px",
        }}
      >
        <div className='sun_icon'>
          <FaArrowDown />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ margin: 0 }}>{formatTime(set)}</p>
          <p style={{ margin: 0, color: "#A0A0A0" }}>
            {compareTime(set, sunset)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SunTimingCard;
