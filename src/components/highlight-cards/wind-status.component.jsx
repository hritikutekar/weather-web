import React from "react";
import { roundOf, windDirection } from "../../utils/utils";
import { FaMapMarkerAlt } from "react-icons/all";

export default function WindStatusCard({ speed, deg }) {
  return (
    <div className='highlight_card'>
      <p className='highlight_title'>Wind Status</p>
      <div className='highlight_value'>
        <h1 className='value'>{roundOf(speed * 3.6, 1)}</h1>
        <p className='unit'>km/h</p>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #e7e7e7",
            padding: "6px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        >
          <FaMapMarkerAlt
            style={{
              color: "#2f3bcb",
              transform: `rotate(${deg}deg)`,
            }}
          />
        </div>
        <p className='highlight_status'>{windDirection(deg)}</p>
      </div>
    </div>
  );
}
