import React from "react";
import "./navigation.css";

const Navigation = props => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="logo">
          <h1>exoplanets</h1>
        </li>
        <li>
          <button className="nav-button" onClick={props.handleAdd}>
            Add Planet
          </button>{" "}
          {/*ADDPLANET DROWPOWN CONTENT*/}
          <div className={props.add ? "update-form" : "hidden"}>
            {" "}
            <div className="update">
              {" "}
              <h3 className="a-name">Name: </h3>{" "}
              <input
                name="name"
                type="text"
                value={props.name}
                onChange={e => props.handleName(e)}
                className="name-input"
              />
            </div>
            <div className="update">
              {" "}
              <h3>Star: </h3>{" "}
              <input
                name="star"
                value={props.star}
                type="text"
                onChange={e => props.handleName(e)}
                className="star-input"
              />
            </div>
            <div className="update">
              {" "}
              <h3>Mass: </h3>{" "}
              <input
                type="text"
                value={props.mass}
                onChange={e => props.handleMass(parseInt(e.target.value))}
                className="mass-input"
              />
            </div>
            <div className="update">
              {" "}
              <h3>Orbit: </h3>{" "}
              <input
                type="text"
                value={props.orbit}
                onChange={e => props.handleOrbit(parseInt(e.target.value))}
                className="orbit-input"
              />
            </div>
            <button onClick={props.addPlanet} className="add-form-button">
              Add Planet
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
