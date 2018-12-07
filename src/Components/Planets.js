import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import Navigation from "./Navigation";
import "./planet.css";

export default class Planets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: [],
      update: false,
      newName: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3002/api/exoplanets/")
      .then(response =>
        this.setState({
          facts: response.data
        })
      )
      .catch(err => console.log(err));
  }

  addPlanet = () => {
    let newPlanet = { name: "planet", parent_star: { name: "star" } };
    axios
      .post("http://localhost:3002/api/exoplanets/", newPlanet)
      .then(res =>
        this.setState({
          facts: res.data
        })
      )
      .catch(err => console.log(err));
  };

  removePlanet = id => {
    axios
      .delete(`http://localhost:3002/api/exoplanets/${id}`)
      .then(res =>
        this.setState({
          facts: res.data
        })
      )
      .catch(err => console.log(err));
  };

  updatePlanet = id => {
    const { newName } = this.state;
    axios
      .put(`http://localhost:3002/api/exoplanets/${id}`, { newName })
      .then(res =>
        this.setState({
          facts: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleUpdate = () => {
    this.setState({
      update: !this.state.update
    });
  };

  handleChange = val => {
    this.setState({
      newName: val
    });
  };

  render() {
    const { facts } = this.state;

    let dispFacts = facts.map((fact, index) => {
      if (fact.mass) {
        var mass = fact.mass.value;
      }
      if (fact.orbital_period) {
        var orbital = fact.orbital_period.value;
      }

      return (
        <List
          key={index}
          name={fact.name}
          star={fact.parent_star.name}
          mass={mass}
          orbital={orbital}
          updatePlanet={this.updatePlanet}
          removePlanet={this.removePlanet}
          handleUpdate={this.handleUpdate}
          id={fact.id}
          update={this.state.update}
          handleChange={this.handleChange}
        />
      );
    });

    return (
      <div>
        <Navigation addPlanet={this.addPlanet} />
        <div className="planet-container">{dispFacts}</div>
      </div>
    );
  }
}
