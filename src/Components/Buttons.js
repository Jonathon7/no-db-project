import React, { Component } from "react";
import "./buttons.css";

export default class Buttons extends Component {
  render() {
    return (
      <div className="button-cont">
        <button className="button-list" onClick={this.props.sortByOrbit}>
          Sort by Orbital Period
        </button>
        <button className="button-list" onClick={this.props.sortByName}>
          Sort A-Z (default)
        </button>
        <button className="button-list" onClick={this.props.deleteAll}>
          I Hate Planets!
        </button>
        <button onClick={this.props.sortReverse} className="button-list">
          Sort Reverse Z-A
        </button>
        <button className="button-list" onClick={this.props.sortByMass}>
          Sort by Mass
        </button>
      </div>
    );
  }
}
