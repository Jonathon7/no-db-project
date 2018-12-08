import React, { Component } from "react";
import "./App.css";
import Planets from "./Components/Planets";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Planets />
      </div>
    );
  }
}

export default App;

// "proxy": "http://localhost:3002"
