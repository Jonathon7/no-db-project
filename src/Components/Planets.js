import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import "./planet.css";
import Navigation from "./Navigation";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "../../node_modules/react-toastify";

export default class Planets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: [],
      newName: "",
      add: false,
      delete: false,
      newPlanet: {},
      name: "",
      star: "",
      mass: 0,
      orbit: 0
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

  notify = () => {
    toast.info("Planet Added!");
  };

  addPlanet = () => {
    axios
      .post("http://localhost:3002/api/exoplanets/", {
        name: this.state.name,
        parent_star: { name: this.state.star },
        mass: { value: this.state.mass },
        orbital_period: { value: this.state.orbit },
        id: this.state.facts.length
      })
      .then(res =>
        this.setState({
          facts: res.data,
          name: "",
          star: "",
          mass: 0,
          orbit: 0,
          add: false
        })
      )
      .catch(err => console.log(err));
    this.notify();
  };

  handleAdd = () => {
    this.setState({
      add: !this.state.add
    });
  };

  removePlanet = id => {
    axios
      .delete(`http://localhost:3002/api/exoplanets/${id}`)
      .then(res =>
        this.setState({
          facts: res.data,
          delete: !this.state.delete
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
          facts: res.data,
          newName: ""
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

  ////METHODS FOR ADDING NEW PLANETS FORM INFO TO STATE

  handleName = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleStar = val => {
    this.setState({
      star: val
    });
  };

  handleMass = val => {
    this.setState({
      mass: val
    });
  };

  handleOrbit = val => {
    this.setState({
      orbit: val
    });
  };

  render() {
    console.log(this.state);
    const { facts } = this.state;

    let dispFacts = facts.slice(0, 20).map((fact, index) => {
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
          id={fact.id}
          update={this.state.update}
          handleChange={this.handleChange}
          newName={this.state.newName}
        />
      );
    });
    ////THE PLANET COMPONENT IS RENDERED IN APP.JS
    return (
      <div>
        <Navigation
          addPlanet={this.addPlanet}
          handleAdd={this.handleAdd}
          add={this.state.add}
          handleName={this.handleName}
          handleStar={this.handleStar}
          handleMass={this.handleMass}
          handleOrbit={this.handleOrbit}
          handleNewPlanet={this.handleNewPlanet}
          ////RESETS INPUTS FOR ADDPLANET FORM
          name={this.state.name}
          star={this.state.star}
          mass={this.state.mass}
          orbit={this.state.orbit}
          delete={this.state.delete}
        />

        <ToastContainer />
        <Header
          title="api.arcsecond.io"
          subTitle="Unified REST APIs for world-wide astronomy data!"
        />
        <div className="planet-container">{dispFacts}</div>
      </div>
    );
  }
}
