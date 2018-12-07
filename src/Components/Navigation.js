import React from "react";
import "./navigation.css";

const Navigation = props => {
  return (
    <div>
      <nav className="nav-container">
        <ul className="nav-list">
          <li>Planets</li>
          <li>
            <button onClick={props.addPlanet} className="nav-button">
              Add Planet
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
