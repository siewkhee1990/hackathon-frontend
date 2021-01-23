import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL_PATIENTS } from "../Constant";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PatientLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please key in required field!");
    }
    let data = {
      email: email,
      password: password,
    };
    axios
      .post(`${BACKEND_URL_PATIENTS}/login`, data)
      .then((response) => {
        localStorage.setItem("ptoken", JSON.stringify(response.data.ptoken));
        props.history.push("/patient/dashboard");
      })
      .catch((err) => {
        if (!err.response.data.message) {
          console.log(err.response);
        } else {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <h1>Patient Portal</h1>
      <Form className="m-3">
        <Form.Group controlId="login">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mx-2"
          onClick={(event) => submitLogin(event)}
        >
          Sign in
        </Button>
        <Link to="/patient/register">
          <Button type="submit" variant="primary" className="mx-2">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}
