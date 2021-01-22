import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Main() {
  return (
    <div>
      <h1>Welcome to Vaccination Management System</h1>
      <Link to="/patient">
        <Button variant="primary" className="mx-2">
          Proceed as Patient
        </Button>
      </Link>
      <Link to="/gp">
        <Button variant="primary" className="mx-2">
          Proceed as GP
        </Button>
      </Link>

    </div>
  );
}
