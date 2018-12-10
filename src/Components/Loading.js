import React from "react";
import "./loading.css";
//THIS COMPONENTS IS RENDERED IN PLANET.JS WHEN THERE IS NOTHING IN THE FACTS ARRAY
export default function Loading() {
  return (
    <div className="loading">
      <h1>Loading </h1>
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
