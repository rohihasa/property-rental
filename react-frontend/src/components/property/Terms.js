import React from "react";
import "./terms.css";

function Terms() {
  return (
    <div>
      <div >
        <span>Rental Agreement</span>
      </div>
      <div className="attachment-card">
        <div>
          <p className="attachment-text">RENTAL AGREEMENT</p>
        </div>
        <div>
          <button className="attachment-button download-button">
            Download
          </button>
          <button className="attachment-button view-button">View</button>
        </div>
      </div>
    </div>
  );
}

export default Terms;
