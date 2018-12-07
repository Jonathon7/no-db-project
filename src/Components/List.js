import React from "react";
import "./list.css";

const List = props => {
  console.log(props);
  return (
    <div className="list-container">
      <h1 onClick={props.handleUpdate}>{props.name}</h1>
      <div className={props.update ? "shown" : "hidden"}>
        <input type="text" onChange={e => props.handleChange(e.target.value)} />
        <button onClick={() => props.updatePlanet(props.id)}>Submit</button>
      </div>

      <img src={props.image} alt="" />
      <h2>Star: {props.star}</h2>
      <h2>Mass: {props.mass} * M_Jup</h2>
      <h2>Orbital Period: {props.orbital} Days</h2>
      <button onClick={() => props.removePlanet(props.id)}>
        Delete Planet
      </button>
    </div>
  );
};

export default List;
