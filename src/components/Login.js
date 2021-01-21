import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL_PATIENTS } from "./Constant";
import { Button, Form } from "react-bootstrap";

export default function Login() {
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
    axios.post(`${BACKEND_URL_PATIENTS}/login`, data).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <Form onSubmit={(event) => submitLogin(event)} className="m-3">
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
        <button type="submit" class="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
