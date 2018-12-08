import React from "react";
import "./header.css";

export default function Header(props) {
  return (
    <div className="header-container">
      <h1>{props.title}</h1>
      <h3>{props.subTitle}</h3>
    </div>
  );
}
