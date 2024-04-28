import React from "react";

function Terms() {

    const handleDownload = () => {

    console.log("Download");
    
    }
    const handleView = () => {
    console.log("View");
    }
  return (
    <div>
      <div >
        <span>View Rental Agreement Terms</span>
      </div>
      <div className="attachment-card">
        <div>
          <p className="attachment-text">RENTAL AGREEMENT</p>
        </div>
        <div>
          <button onClick={handleDownload} className="attachment-button download-button">
            Download
          </button>
          <button onclick={handleView} className="attachment-button view-button">View</button>
        </div>
      </div>
    </div>
  );
}

export default Terms;
