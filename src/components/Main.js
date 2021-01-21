import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <h1>Welcome to Vaccination Management System</h1>
      <Link to="/patient">
        <button>Proceed as Patient</button>
      </Link>
      <Link to="/gp">
        <button>Proceed as GP</button>
      </Link>
    </div>
  );
}
