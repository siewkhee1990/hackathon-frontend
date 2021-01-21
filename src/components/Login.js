import React, { useState } from "react";
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
    console.log(data);
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

        <Button variant="primary" type="submit" className="m-5">
          Login
        </Button>
      </Form>
    </div>
  );
}
