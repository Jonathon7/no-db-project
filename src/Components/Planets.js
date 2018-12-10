import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import "./planet.css";
import Navigation from "./Navigation";
import Header from "./Header";
import Loading from "./Loading";
import Buttons from "./Buttons";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "../../node_modules/react-toastify";
import Restore from "./Restore";

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
      orbit: 0,
      restore: [],
      notify: []
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
  ////TOAST NOTIFICATION WHEN A PLANET IS ADDED
  notify = () => {
    toast.info("Planet Added!");
  };

  ////TOAST NOTIFICATION WHEN PLANETS ARE RESTORED
  restoreNotify = () => {
    toast.info("Planets Successfully Restored!");
  };

  ////ADDS A NEW PLANET TO THE BEGINNING OF THE FACTS ARRAY
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
          ////VALUES ADD TO THE FACTS ARRAY AND RESETS INPUTS ON ADD PLANET FORM
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

  ////TOGGLES THE ADD VALUE IN STATE FOR THE DROPDOWN IN THE NAV COMPONENT TO ADD A PLANET
  handleAdd = () => {
    this.setState({
      add: !this.state.add
    });
  };

  ////REMOVES PLANETS FROM THE FACTS ARRAY
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

  ////UPDATES THE PLANET'S NAME
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

  ////KEEPS TRACK OF THE NEW NAME OF THE PLANET IN STATE
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

  ////SORTS THE ARRAY WITH BUTTONS.JS

  sortByOrbit = () => {
    let sortByOrbit = this.state.facts.sort(function(a, b) {
      if (a.orbital_period && b.orbital_period) {
        return a.orbital_period.value - b.orbital_period.value;
      }
    });

    this.setState({
      facts: sortByOrbit
    });
  };

  sortByMass = () => {
    let sortByMass = this.state.facts.sort(function(a, b) {
      if (a.mass && b.mass) {
        return a.mass.value - b.mass.value;
      }
    });
    this.setState({
      facts: sortByMass
    });
  };

  sortByName = () => {
    let sortByName = this.state.facts.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({
      facts: sortByName
    });
  };

  sortReverse = () => {
    let sortReverse = this.state.facts.sort(function(a, b) {
      return b.id - a.id;
    });
    this.setState({
      facts: sortReverse
    });
  };

  deleteAll = () => {
    axios
      .delete("http://localhost:3002/api/exoplanets/")
      .then(res => {
        this.setState({
          facts: res.data,
          restore: [1]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //window.location.reload();
  restorePlanets = () => {
    this.componentDidMount();
    this.setState({
      restore: [],
      notify: [1]
    });
  };

  render() {
    const { facts } = this.state;

    let dispFacts = facts.slice(0, 18).map((fact, index) => {
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

    ///NOTIFIES WHEN THE FACTS ARRAY IS FILLED AGAIN AFTER RESTORE BUTTON IS CLICKED
    if (this.state.notify[0] && this.state.facts[0]) {
      this.restoreNotify();
      this.setState({
        notify: []
      });
    }

    ////THE PLANET COMPONENT IS RENDERED IN APP.JS
    return (
      <div>
        {!this.state.restore[0] ? (
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
        ) : null}

        <ToastContainer />
        {!this.state.restore[0] ? (
          <Header
            title="api.arcsecond.io"
            subTitle="Unified REST APIs for world-wide astronomy data!"
          />
        ) : null}

        {this.state.facts[0] ? (
          <Buttons
            sortByOrbit={this.sortByOrbit}
            sortByMass={this.sortByMass}
            sortByName={this.sortByName}
            sortReverse={this.sortReverse}
            deleteAll={this.deleteAll}
          />
        ) : null}
        {!this.state.facts[0] && !this.state.restore[0] ? <Loading /> : null}

        {this.state.restore[0] && !this.state.facts[0] ? (
          <Restore restorePlanets={this.restorePlanets} />
        ) : null}
        <div className="planet-container">
          {!this.state.restore[0] ? dispFacts : null}
        </div>
      </div>
    );
  }
}
