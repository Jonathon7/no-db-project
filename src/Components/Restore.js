import React from "react";
import "./restore.css";

export default function Restore(props) {
  return (
    <div className="restore-container">
      <button className="restore-button" onClick={props.restorePlanets}>
        Restore
      </button>
    </div>
  );
}
