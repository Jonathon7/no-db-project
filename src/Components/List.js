import React, { Component } from "react";
import "./list.css";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: false
    };
  }

  handleToggle = () => {
    this.setState({
      update: !this.state.update
    });
  };

  render() {
    return (
      <div className="list-container">
        <h1 onClick={this.handleToggle}>{this.props.name}</h1>
        <div className={this.state.update ? "shown" : "hidden"}>
          <input
            type="text"
            value={this.props.newName}
            onChange={e => this.props.handleChange(e.target.value)}
          />
          <button onClick={() => this.props.updatePlanet(this.props.id)}>
            Submit
          </button>
        </div>

        <h2>Star: {this.props.star}</h2>
        <h2>Mass: {this.props.mass ? this.props.mass + "M_Jup" : "null"}</h2>
        <h2>
          Orbit Period:
          {this.props.orbital ? this.props.orbital + "Days" : " null"}
        </h2>
        <button
          onClick={() => this.props.removePlanet(this.props.id)}
          className="delete-button"
        >
          Delete Planet
        </button>
      </div>
    );
  }
}

export default List;
